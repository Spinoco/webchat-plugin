import { createStoreWithDevTools } from "botframework-webchat";
import { Store } from "redux";
import { LocaleService } from "../locale/locale-service";

const SCROLL_ANIMATION_DELAY = 850;

export class StoreService {
    private localeService: LocaleService;
    private readonly store: Store;
    public onConversationLoaded?: () => void = undefined;

    constructor(localeService: LocaleService) {
        this.localeService = localeService;
        this.store = createStoreWithDevTools(
            {},
            ({ dispatch }: { dispatch: (props: object) => void }) =>
                (next: (action: unknown) => void) =>
                (action: { type: string }) => {
                    console.log(action);
                    if (action.type === "DIRECT_LINE/CONNECT_FULFILLED") {
                        // dispatch({
                        //     type: "WEB_CHAT/SEND_EVENT",
                        //     payload: {
                        //         name: "webchat/join",
                        //         value: { language: this.localeService.getLocale() },
                        //     },
                        // });

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

    getStore(): Store {
        return this.store;
    }

    // const localStorageData = localStorage.getItem(REDUX_STORE_KEY);
    // const restoreInitialState = localStorageData !== null;
    // const initialState = restoreInitialState ? JSON.parse(localStorageData) : {};

    // window.addEventListener("error", (event) => {
    //     //handle only error from webchat js file
    //     if (event && event.filename == WEBCHAT_URI) {
    //         if (
    //             event.error &&
    //             event.error.response &&
    //             event.error.response.error &&
    //             event.error.response.error.code == "BadArgument" &&
    //             event.error.response.error.message == "Conversation not found"
    //         ) {
    //             __spWebChat.startNewConversation();
    //         }
    //
    //         console.log("Error, ", event);
    //         return true;
    //     }
    // });

    // store.subscribe(() => {
    //     localStorage.setItem(REDUX_STORE_KEY, JSON.stringify(store.getState()));
    // });

    // window.addEventListener("keydown", (event) => {
    //     const { ctrlKey, key } = event;
    //
    //     if (ctrlKey && (key === "r" || key === "R")) {
    //         // CTRL-R
    //         localStorage.removeItem(REDUX_STORE_KEY);
    //     } else if (ctrlKey && (key === "s" || key === "S")) {
    //         // CTRL-S
    //         event.preventDefault();
    //         // eslint-disable-next-line no-console
    //         store && console.log(store.getState());
    //     }
    // });
}
