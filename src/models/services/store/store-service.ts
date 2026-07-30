import { createStore } from "botframework-webchat";
import { PostActivityAction } from "botframework-webchat-core/src/actions/postActivity";
import { Store } from "redux";
import { LocaleService } from "../locale/locale-service";
import { ChatDomService } from "../dom/chat-dom-service";
import { ChatConversationStartPayloadInterface } from "../../interfaces/conversation/chat-conversation-start-payload-interface";

const SCROLL_ANIMATION_DELAY = 850;

export class StoreService {
    private localeService: LocaleService;
    private domService: ChatDomService;
    private currentStore?: Store;
    public onConversationLoaded?: () => void = undefined;
    public onFeedback?: (feedbackInstanceId: string) => void = undefined;

    constructor(localeService: LocaleService, domService: ChatDomService) {
        this.localeService = localeService;
        this.domService = domService;
    }

    /**
     * Store that backs the conversation that is currently running.
     *
     * It is created when it is asked for the first time, so the pages where the chat is never
     * opened do not pay for it.
     */
    public get store(): Store {
        return (this.currentStore ??= this.createStore());
    }

    /**
     * Creates a store for a brand new conversation, dropping any state (ie. the transcript)
     * of the conversation that was running so far.
     *
     * The structured data of the conversation, if any, is bound to that very store, so it is
     * handed over to the backend with the `webchat/join` event of that conversation only.
     *
     * As the store is bound to the chat component, the component has to be re-mounted with
     * the new store, see the `App`.
     */
    public recreateStore(startPayload: ChatConversationStartPayloadInterface): void {
        this.currentStore = this.createStore(startPayload);
    }

    private createStore(startPayload?: ChatConversationStartPayloadInterface): Store {
        // the payload belongs to the start of the conversation only, so it is dropped once it is
        // sent and is not repeated when the very same conversation reconnects
        let pendingStartPayload = startPayload;

        return createStore(
            {},
            ({ dispatch }: { dispatch: (props: object) => void }) =>
                (next: (action: unknown) => void) =>
                (action: any) => {
                    // add url to channel data
                    if (action.type === "DIRECT_LINE/POST_ACTIVITY") {
                        this.addUrlToChannelData(action as PostActivityAction);
                    }

                    if (action.type === "DIRECT_LINE/CONNECT_FULFILLED") {
                        // trigger welcome message when connection is fulfilled
                        console.log("Connected to bot");
                        const contact = this.domService.getCustomerObject();
                        const value = pendingStartPayload ? { contact, payload: pendingStartPayload } : { contact };
                        pendingStartPayload = undefined;

                        dispatch({
                            type: "WEB_CHAT/SEND_EVENT",
                            payload: { name: "webchat/join", value },
                        });

                        // triggers conversation loaded event (serve to hide initial scrolling) when connection is fulfilled
                        setTimeout(() => {
                            if (this.onConversationLoaded) {
                                this.onConversationLoaded();
                            }
                        }, SCROLL_ANIMATION_DELAY);
                    }

                    // open feedback form
                    if (action.type === "WEB_CHAT/FEEDBACK") {
                        if (this.onFeedback) {
                            const feedbackInstanceId = "demo-feedback-instance-id"; // TODO: get feedbackInstanceId from action object
                            this.onFeedback(feedbackInstanceId);
                        }
                    }

                    if (action.type === "DIRECT_LINE/INCOMING_ACTIVITY") {
                        // when reading message with attachments from history wrong role is set for messages from user
                        // this is a workaround to fix it
                        const fromSpinocoBackend = action.payload.activity.channelData?.role;

                        if (!fromSpinocoBackend) {
                            if (action.payload.activity.attachments?.length > 0) {
                                action.payload.activity.from.role = "user";
                            }
                        }
                    }

                    return next(action);
                },
        );
    }

    addUrlToChannelData(action: PostActivityAction) {
        if (action.payload.activity.type === "message") {
            action.payload.activity.channelData = {
                ...action.payload.activity.channelData,
                webPageUri: window.location.href,
            };
        }
    }
}
