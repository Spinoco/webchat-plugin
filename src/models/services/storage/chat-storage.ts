import { ChatStorageKeys } from "../../enums/storage/chat-storage-keys";
import { Storage } from "./storage";
import { AppState } from "../../enums/app-state";
import { ChatState } from "../../enums/chat-state";

export class ChatStorage extends Storage<ChatStorageKeys> {
    private static instance?: ChatStorage;

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

    setChatState(chatState: ChatState) {
        this.set(ChatStorageKeys.chatState, chatState);
    }

    public getChatState(): ChatState | undefined {
        return (this.get(ChatStorageKeys.chatState) as ChatState) || undefined;
    }
}
