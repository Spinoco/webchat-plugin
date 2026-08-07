/**
 * Structured data that is handed over to the backend when a conversation is started.
 */
export interface ChatConversationStartPayloadInterface {
    /** Rich parameters that are handed over to the workflow. */
    params?: Record<string, unknown>;
}
