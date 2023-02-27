import { createStore, createStoreWithDevTools } from "botframework-webchat";
import { Store } from "redux";
import { LocaleService } from "../locale/locale-service";

const SCROLL_ANIMATION_DELAY = 850;

export class StoreService {
    private localeService: LocaleService;
    public readonly store: Store;
    public onConversationLoaded?: () => void = undefined;

    /**
     * When connection is fulfilled:
     * - triggers welcome message
     * - triggers conversation loaded event (serve to hide initial scrolling)
     */
    constructor(localeService: LocaleService) {
        this.localeService = localeService;
        this.store = createStore(
            {},
            ({ dispatch }: { dispatch: (props: object) => void }) =>
                (next: (action: unknown) => void) =>
                (action: { type: string }) => {
                    if (action.type === "DIRECT_LINE/CONNECT_FULFILLED") {
                        dispatch({
                            type: "WEB_CHAT/SEND_EVENT",
                            payload: {
                                name: "webchat/join",
                                value: { language: this.localeService.locale },
                            },
                        });

                        setTimeout(() => {
                            if (this.onConversationLoaded) {
                                this.onConversationLoaded();
                            }
                        }, SCROLL_ANIMATION_DELAY);
                    }

                    return next(action);
                },
        );
    }
}
