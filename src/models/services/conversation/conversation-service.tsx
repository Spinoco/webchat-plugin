import ChatStorage from "../storage/chat-storage";
import { DirectLine } from "botframework-directlinejs";
import { createDirectLine as createLine } from "botframework-webchat";
import { DirectLineInterface } from "../../interfaces/configuration/direct-line-interface";
import { config } from "../../../config/config";

export class ConversationService {
    private chatStorage: ChatStorage;
    private readonly directLine: DirectLineInterface;
    public onConversationChange?: (directLine: DirectLine) => void = undefined;

    public constructor(chatStorage: ChatStorage, directLine: DirectLineInterface) {
        this.chatStorage = chatStorage;
        this.directLine = directLine;
        this.attachEvents();
    }

    /**
     * Vytvoří novou konverzaci nebo původní konverzaci dle uloženého identifikátoru ve storage.
     */
    public async startConversation(): Promise<void> {
        const conversationId = this.chatStorage.getConversationId();
        const secret = this.directLine.useMockbot ? await this.getTokenFromMockbot() : this.directLine.secret;
        const directLine: DirectLine = createLine({ secret, watermark: "0", conversationId });

        directLine.connectionStatus$.subscribe(() => {
            const conversationId = directLine["conversationId"];
            if (conversationId && !this.directLine.useMockbot) {
                this.chatStorage.setConversationId(conversationId);
            }
        });

        if (this.onConversationChange) {
            this.onConversationChange(directLine);
        }
    }

    /**
     * Load token from mocbok api.
     */
    private async getTokenFromMockbot(): Promise<string> {
        const res = await fetch(config.chat.mockbotTokenApiUrl, { method: "POST" });
        const data = await res.json();
        return data.token;
    }

    /**
     * Při neexistující konverzaci vytvoříme novou konverzaci.
     */
    private attachEvents() {
        window.addEventListener("error", async (event) => {
            if (
                event.error?.response?.error?.code == "BadArgument" &&
                (event.error?.response?.error?.message === "Conversation not found" ||
                    event.error?.response?.error?.message === "Token not valid for this conversation")
            ) {
                await this.resetConversation();
            }
        });
    }

    /**
     * Smaže uloženou konverzaci ve storage a vytvoří novou.
     */
    private async resetConversation(): Promise<void> {
        this.chatStorage.clear();
        await this.startConversation();
    }
}
