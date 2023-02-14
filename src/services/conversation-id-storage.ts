import { conversationIdStorageKey } from "../constants/conversation-id-storage-key";

export class ConversationIdStorage {
    static get(): string | undefined {
        return localStorage.getItem(conversationIdStorageKey) ?? undefined;
    }

    static set(conversationId: string): void {
        localStorage.setItem(conversationIdStorageKey, conversationId);
    }

    static remove(): void {
        localStorage.removeItem(conversationIdStorageKey);
    }
}
