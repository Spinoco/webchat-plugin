import { ChatStorage } from "../storage/chat-storage";
import { DirectLine } from "botframework-directlinejs";
import { createDirectLine as createLine } from "botframework-webchat";
import { DirectLineInterface } from "../../interfaces/configuration/direct-line-interface";
import { config } from "../../../config/config";

export class ConversationService {
    private chatStorage: ChatStorage;
    private readonly directLine: DirectLineInterface;
    public onDirectLineCreated?: (directLine: DirectLine) => void = undefined;

    public constructor(chatStorage: ChatStorage, directLine: DirectLineInterface) {
        this.chatStorage = chatStorage;
        this.directLine = directLine;
        this.attachEvents();
    }

    /**
     * Load conversation from storage or create new one.
     */
    public async startConversation(): Promise<void> {
        const conversationId = this.directLine.useMockbot ? undefined : this.chatStorage.getConversationId();
        const secret = this.directLine.useMockbot ? await this.getTokenFromMockbot() : this.directLine.secret;
        let domain = undefined;
        if (this.directLine.domain === "europe") {
            domain = "https://europe.directline.botframework.com/v3/directline";
        } else if (this.directLine.domain === "india") {
            domain = "https://india.directline.botframework.com/v3/directline";
        }

        const directLine: DirectLine = createLine({ secret, watermark: "0", conversationId, domain });

        directLine.connectionStatus$.subscribe(() => {
            const conversationId = directLine["conversationId"];
            if (conversationId && !this.directLine.useMockbot) {
                this.chatStorage.setConversationId(conversationId);
            }
        });

        if (this.onDirectLineCreated) {
            this.onDirectLineCreated(directLine);
        }
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
                await this.resetConversation();
            }
        });
    }

    /**
     * Removes stored conversation and starts new one.
     */
    private async resetConversation(): Promise<void> {
        this.chatStorage.clear();
        await this.startConversation();
    }
}
