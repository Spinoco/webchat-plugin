import { config } from "../../../config/config";
import { WebchatContextKind } from "../../enums/webchat-context-kind";
import { WebchatContextInterface } from "../../interfaces/context/webchat-context-interface";
import { ChatConversationStartPayloadInterface } from "../../interfaces/conversation/chat-conversation-start-payload-interface";
import { DomService } from "../dom/dom-service";

/**
 * This service is used to read the structured context that may be handed over to the page
 * that hosts the chat.
 *
 * The context is passed in the `webchat_context` query parameter as base64url encoded json:
 *
 * ```
 * webchat_context=base64url({
 *     wfId: "..."                                       // optional
 *     , question: "You sure you want to start newChat?"
 *     , kind: "YesNo"
 *     , params: {}
 * })
 * ```
 *
 * Once the context is read, the parameter is removed from the url of the page, so the user
 * won't be asked again when the page is reloaded.
 */
export class WebchatContextService {
    private readonly window: Window;
    private context?: WebchatContextInterface;
    private read = false;

    constructor(domService: DomService) {
        this.window = domService.getWindow();
    }

    /**
     * The context that was handed over in the url of the page, if any.
     *
     * The very first call reads the context from the url and removes it from there,
     * any subsequent call returns the same context again.
     */
    getContext(): WebchatContextInterface | undefined {
        if (!this.read) {
            this.read = true;
            this.context = this.readFromUrl();
        }

        return this.context;
    }

    /**
     * Creates the payload that is sent to the backend when the conversation of the given
     * context is started.
     */
    createStartPayload(context: WebchatContextInterface): ChatConversationStartPayloadInterface {
        return {
            hintedWfId: context.wfId,
            params: context.params,
        };
    }

    /** Reads and validates the context from the url of the page, removing it from the url. */
    private readFromUrl(): WebchatContextInterface | undefined {
        const url = new URL(this.window.location.href);
        const encoded = url.searchParams.get(config.chat.contextQueryParam);

        if (!encoded) {
            return undefined;
        }

        this.removeFromUrl(url);

        return this.parse(encoded);
    }

    /** Removes the context parameter from the url of the page, keeping the rest of the url intact. */
    private removeFromUrl(url: URL): void {
        try {
            url.searchParams.delete(config.chat.contextQueryParam);
            this.window.history.replaceState(this.window.history.state, "", url.toString());
        } catch (error) {
            console.warn("Failed to remove the webchat context from the url", error);
        }
    }

    /** Decodes the context and verifies that we can actually work with it. */
    private parse(encoded: string): WebchatContextInterface | undefined {
        let parsed: Partial<WebchatContextInterface>;

        try {
            parsed = JSON.parse(this.decodeBase64Url(encoded));
        } catch (error) {
            console.warn("Failed to decode the webchat context, ignoring it", error);
            return undefined;
        }

        if (typeof parsed?.question !== "string" || parsed.question.length === 0) {
            console.warn("The webchat context has no question, ignoring it", parsed);
            return undefined;
        }

        if (!Object.values(WebchatContextKind).includes(parsed.kind as WebchatContextKind)) {
            console.warn(`The webchat context is of an unknown kind '${parsed.kind}', ignoring it`, parsed);
            return undefined;
        }

        return { ...parsed, question: parsed.question, kind: parsed.kind as WebchatContextKind };
    }

    /** Decodes base64url (RFC 4648, section 5) encoded utf-8 string. */
    private decodeBase64Url(encoded: string): string {
        const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
        const padding = (4 - (base64.length % 4)) % 4;
        const binary = this.window.atob(base64 + "=".repeat(padding));

        return new TextDecoder().decode(Uint8Array.from(binary, (character) => character.charCodeAt(0)));
    }
}
