/**
 * Structured data that is handed over to the backend when a conversation is started.
 *
 * This mirrors its backend counterpart
 * `spinoco.services.communication.messages.ChatConversationStartPayload`,
 * the naming of the fields must be kept in sync with it.
 */
export interface ChatConversationStartPayloadInterface {
    /** Workflow that we were hinted to start. The backend verifies it before it starts it. */
    hintedWfId?: string;

    /** Rich parameters that are handed over to the workflow. */
    params?: Record<string, unknown>;
}
