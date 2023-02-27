import { createStoreWithDevTools } from "botframework-webchat";
import { Store } from "redux";
import { LocaleService } from "../locale/locale-service";

const SCROLL_ANIMATION_DELAY = 850;

export class StoreService {
    private localeService: LocaleService;
    public readonly store: Store;
    public onConversationLoaded?: () => void = undefined;

    constructor(localeService: LocaleService) {
        this.localeService = localeService;
        this.store = createStoreWithDevTools(
            {},
            ({ dispatch }: { dispatch: (props: object) => void }) =>
                (next: (action: unknown) => void) =>
                (action: { type: string }) => {
                    if (action.type === "DIRECT_LINE/CONNECT_FULFILLED") {
                        dispatch({
                            type: "WEB_CHAT/SEND_EVENT",
                            payload: {
                                name: "webchat/join",
                                value: { language: this.localeService.getLocale() },
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
