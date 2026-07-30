import { ChatStorage } from "../storage/chat-storage";
import { DirectLine } from "botframework-directlinejs";
import { createDirectLine as createLine } from "botframework-webchat";
import { DirectLineInterface } from "../../interfaces/configuration/direct-line-interface";
import { config } from "../../../config/config";

export class ConversationService {
    private chatStorage: ChatStorage;

    /** Configuration the direct lines are created from, ie. the secret and the domain. */
    private readonly directLineConfiguration: DirectLineInterface;

    public onDirectLineCreated?: (directLine: DirectLine) => void = undefined;

    /**
     * The direct line of the conversation that is currently running, if any.
     *
     * It is held to be able to end it when the conversation is replaced, and to tell whether a
     * direct line that reports something is still the one we are running.
     */
    private currentDirectLine?: DirectLine;

    /**
     * Subscription to the connection status of the currently running conversation.
     *
     * Ending a direct line does not complete its connection status, so the subscription has to
     * be released by hand when the conversation is replaced.
     */
    private currentSubscription?: { unsubscribe: () => void };

    public constructor(chatStorage: ChatStorage, directLineConfiguration: DirectLineInterface) {
        this.chatStorage = chatStorage;
        this.directLineConfiguration = directLineConfiguration;
        this.attachEvents();
    }

    /** Yields to true when there is a conversation that was started before and may be resumed. */
    public hasStoredConversation(): boolean {
        return this.chatStorage.getConversationId() !== undefined;
    }

    /**
     * Load conversation from storage or create new one.
     */
    public async startConversation(): Promise<void> {
        const useMockbot = this.directLineConfiguration.useMockbot;
        const conversationId = useMockbot ? undefined : this.chatStorage.getConversationId();
        const secret = useMockbot ? await this.getTokenFromMockbot() : this.directLineConfiguration.secret;
        let domain = undefined;
        if (this.directLineConfiguration.domain === "europe") {
            domain = "https://europe.directline.botframework.com/v3/directline";
        } else if (this.directLineConfiguration.domain === "india") {
            domain = "https://india.directline.botframework.com/v3/directline";
        }

        const directLine: DirectLine = createLine({ secret, watermark: "0", conversationId, domain });
        this.currentDirectLine = directLine;

        this.currentSubscription = directLine.connectionStatus$.subscribe(() => {
            const conversationId = directLine["conversationId"];
            // the conversation may have been replaced in the meantime, in such case its id
            // must not be stored anymore, as it would overwrite the id of the current one
            if (conversationId && !useMockbot && this.currentDirectLine === directLine) {
                this.chatStorage.setConversationId(conversationId);
            }
        });

        if (this.onDirectLineCreated) {
            this.onDirectLineCreated(directLine);
        }
    }

    /**
     * Replaces the conversation that is currently running with a brand new one.
     *
     * The stored conversation id is dropped, so the direct line creates (and stores) a new
     * conversation instead of loading the previous one.
     */
    public async replaceConversation(): Promise<void> {
        this.endCurrentConversation();
        this.chatStorage.clear();
        await this.startConversation();
    }

    /**
     * Load token from mockbot api.
     */
    private async getTokenFromMockbot(): Promise<string> {
        const res = await fetch(config.chat.mockbotTokenApiUrl, { method: "POST" });
        const data = await res.json();
        return data.token;
    }

    /**
     * Reset conversation if old one can't be loaded.
     */
    private attachEvents() {
        window.addEventListener("error", async (event) => {
            if (
                event.error?.response?.error?.message === "Conversation not found" ||
                event.error?.response?.error?.message === "Token not valid for this conversation"
            ) {
                await this.replaceConversation();
            }
        });
    }

    /** Releases the conversation that is currently running, so it does not receive anything anymore. */
    private endCurrentConversation(): void {
        this.currentSubscription?.unsubscribe();
        this.currentSubscription = undefined;
        this.currentDirectLine?.end();
        this.currentDirectLine = undefined;
    }
}
