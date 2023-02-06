import { createStoreWithDevTools } from "botframework-webchat";
import { getLocale } from "./get-locale";
import { Store } from "redux";

const REDUX_STORE_KEY = "REDUX_STORE";

export const createStore = (): Store => {
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

    store.subscribe(() => {
        localStorage.setItem(REDUX_STORE_KEY, JSON.stringify(store.getState()));
    });

    window.addEventListener("keydown", (event) => {
        const { ctrlKey, key } = event;

        if (ctrlKey && (key === "r" || key === "R")) {
            // CTRL-R
            localStorage.removeItem(REDUX_STORE_KEY);
        } else if (ctrlKey && (key === "s" || key === "S")) {
            // CTRL-S
            event.preventDefault();
            // eslint-disable-next-line no-console
            store && console.log(store.getState());
        }
    });

    return store;
};
