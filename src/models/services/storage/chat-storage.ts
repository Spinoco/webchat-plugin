import { ChatStorageKeys } from "../../enums/storage/chat-storage-keys";
import { Storage } from "./storage";

export default class ChatStorage extends Storage<ChatStorageKeys> {
    private static instance?: ChatStorage;

    private constructor() {
        super();
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new ChatStorage();
        }

        return this.instance;
    }

    public getConversationId(): string | undefined {
        return this.get(ChatStorageKeys.conversationId) || undefined;
    }

    public setConversationId(conversationId: string) {
        this.set(ChatStorageKeys.conversationId, conversationId);
    }

    public clear() {
        this.clearItems([ChatStorageKeys.conversationId]);
    }
}
