import { config } from "../config/config";

export class ConversationIdStorage {
    static get(): string | undefined {
        return localStorage.getItem(config.conversationIdStorageKey) ?? undefined;
    }

    static set(conversationId: string): void {
        localStorage.setItem(config.conversationIdStorageKey, conversationId);
    }

    static remove(): void {
        localStorage.removeItem(config.conversationIdStorageKey);
    }
}
