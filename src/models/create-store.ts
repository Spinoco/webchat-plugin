import { createStoreWithDevTools } from "botframework-webchat";
import { Store } from "redux";
import { getLocale } from "../utils/get-locale";

// const REDUX_STORE_KEY = "REDUX_STORE";

export const createStore = (): Store => {
    // const localStorageData = localStorage.getItem(REDUX_STORE_KEY);
    // const restoreInitialState = localStorageData !== null;
    // const initialState = restoreInitialState ? JSON.parse(localStorageData) : {};

    const store = createStoreWithDevTools(
        {},
        ({ dispatch }: { dispatch: (props: object) => void }) =>
            (next: (action: unknown) => void) =>
            (action: { type: string }) => {
                if (action.type === "DIRECT_LINE/CONNECT_FULFILLED") {
                    dispatch({
                        type: "WEB_CHAT/SEND_EVENT",
                        payload: {
                            name: "webchat/join",
                            value: { language: getLocale() },
                        },
                    });
                }

                return next(action);
            },
    );

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

    return store;
};
