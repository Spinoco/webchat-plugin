import { ConversationIdStorageKey } from "../constants/conversation-id-storage-key";

export class ConversationIdStorage {
    static get(): string | undefined {
        return localStorage.getItem(ConversationIdStorageKey) ?? undefined;
    }

    static set(conversationId: string): void {
        localStorage.setItem(ConversationIdStorageKey, conversationId);
    }

    static remove(): void {
        localStorage.removeItem(ConversationIdStorageKey);
    }
}
