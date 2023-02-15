import ChatStorage from "../storage/chat-storage";
import { DirectLine } from "botframework-directlinejs";
import { createDirectLine as createLine } from "botframework-webchat";
import { config } from "../../../config/config";

export class ConversationService {
    private chatStorage: ChatStorage;

    public onConversationChange?: (directLine: DirectLine) => void = undefined;

    public constructor(chatStorage: ChatStorage) {
        this.chatStorage = chatStorage;
        this.attachEvents();
    }

    /**
     * Vytvoří novou konverzaci nebo původní konverzaci dle uloženého identifikátoru ve storage.
     */
    public async startConversation(): Promise<void> {
        const token = await this.getToken();

        const conversationId = this.chatStorage.getConversationId();
        const directLine: DirectLine = createLine({ token, watermark: "0", conversationId });

        directLine.connectionStatus$.subscribe(() => {
            // TODO: fix types
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const conversationId = directLine.conversationId;
            if (conversationId) {
                this.chatStorage.setConversationId(conversationId);
            }
        });

        if (this.onConversationChange) {
            this.onConversationChange(directLine);
        }
    }

    /**
     * Vrací token z konfigurace a v případě, že chybí, tak vytvoří nový z mockbot api.
     */
    private async getToken() {
        if (config.chat.token.length > 0) {
            return config.chat.token;
        }

        return this.getTokenFromMockbot();
    }

    /**
     * Načte token z mockbot api.
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
