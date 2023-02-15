import { config } from "../../config/config";

export class ConversationIdStorage {
    static get(): string | undefined {
        return localStorage.getItem(config.storageKeys.conversationId) ?? undefined;
    }

    static set(conversationId: string): void {
        localStorage.setItem(config.storageKeys.conversationId, conversationId);
    }

    static remove(): void {
        localStorage.removeItem(config.storageKeys.conversationId);
    }
}
