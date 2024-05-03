import { createStore } from "botframework-webchat";
import { PostActivityAction } from "botframework-webchat-core/src/actions/postActivity";
import { Store } from "redux";
import { LocaleService } from "../locale/locale-service";

const SCROLL_ANIMATION_DELAY = 850;

export class StoreService {
    private localeService: LocaleService;
    public readonly store: Store;
    public onConversationLoaded?: () => void = undefined;
    public onFeedback?: (feedbackInstanceId: string) => void = undefined;

    constructor(localeService: LocaleService) {
        this.localeService = localeService;
        this.store = createStore(
            {},
            ({ dispatch }: { dispatch: (props: object) => void }) =>
                (next: (action: unknown) => void) =>
                (action: { type: string }) => {
                    // add url to channel data
                    if (action.type === "DIRECT_LINE/POST_ACTIVITY") {
                        this.addUrlToChannelData(action as PostActivityAction);
                    }

                    if (action.type === "DIRECT_LINE/CONNECT_FULFILLED") {
                        // trigger welcome message when connection is fulfilled
                        dispatch({
                            type: "WEB_CHAT/SEND_EVENT",
                            payload: {
                                name: "webchat/join",
                                value: { language: this.localeService.locale },
                            },
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
                      const fromSpinocoBackend = action.payload.activity.channelData?.role;
                      if (!fromSpinocoBackend) {
                        if (action.payload.activity.attachments?.length > 0) {
                          action.payload.activity.from.role = 'user';
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
