import ChatStorage from "../storage/chat-storage";
import { DirectLine } from "botframework-directlinejs";
import { createDirectLine as createLine } from "botframework-webchat";

export class ConversationService {
    private chatStorage: ChatStorage;
    private readonly directLineSecret: string;
    public onConversationChange?: (directLine: DirectLine) => void = undefined;

    public constructor(chatStorage: ChatStorage, directLineSecret: string) {
        this.chatStorage = chatStorage;
        this.directLineSecret = directLineSecret;
        this.attachEvents();
    }

    /**
     * Vytvoří novou konverzaci nebo původní konverzaci dle uloženého identifikátoru ve storage.
     */
    public async startConversation(): Promise<void> {
        const conversationId = this.chatStorage.getConversationId();
        const directLine: DirectLine = createLine({ secret: this.directLineSecret, watermark: "0", conversationId });

        directLine.connectionStatus$.subscribe(() => {
            const conversationId = directLine["conversationId"];
            if (conversationId) {
                this.chatStorage.setConversationId(conversationId);
            }
        });

        if (this.onConversationChange) {
            this.onConversationChange(directLine);
        }
    }

    // /**
    //  * Load token from mocbok api.
    //  */
    // private async getTokenFromMockbot(): Promise<string> {
    //     const res = await fetch(config.chat.mockbotTokenApiUrl, { method: "POST" });
    //     const data = await res.json();
    //     return data.token;
    // }

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
