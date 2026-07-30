import { WebchatContextKind } from "../../enums/webchat-context-kind";

/**
 * Structured context that may be handed over to the plugin in the url of the page,
 * see the `WebchatContextService`.
 */
export interface WebchatContextInterface {
    /** Workflow that we are hinted to start. Optional, the backend verifies it before it starts it. */
    wfId?: string;

    /** Question that is presented to the user, already localised by the producer of the context. */
    question: string;

    /** Kind of the interaction that shall be performed with the user. */
    kind: WebchatContextKind;

    /** Rich parameters that shall be handed over to the started workflow. */
    params?: Record<string, unknown>;

    /** Label of the confirming button, already localised by the producer of the context. */
    yesLabel?: string;

    /** Label of the dismissing button, already localised by the producer of the context. */
    noLabel?: string;
}
