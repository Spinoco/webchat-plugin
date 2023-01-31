import React, { useMemo, useState } from "react";
import { ConfigurationInterface } from "./interfaces/configuration-interface";
import ReactWebChat, { createDirectLine, createStoreWithDevTools } from "botframework-webchat";
import { DirectLine } from "botframework-directlinejs";
import { StyleOptions } from "botframework-webchat-api";
import { UserInterface } from "./interfaces/user-interface";
import { getLocale } from "./models/get-locale";

interface AppProps {
    data: ConfigurationInterface;
    user?: UserInterface;
    clientId: string;
}

const REDUX_STORE_KEY = "REDUX_STORE";

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

console.log(store);

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

export const App: React.FC<AppProps> = ({ clientId, user, data }) => {
    const [opened, setOpened] = useState<boolean>(false);
    const [directLine, setDirectLine] = useState<DirectLine>();

    const styleOptions: StyleOptions = {
        sendBoxBackground: data.sendBoxBackground,
        // avatars configuration
        botAvatarImage: "/bot-avatar.jpg",
        userAvatarImage: "/user-avatar.jpg",
        botAvatarInitials: "BF",
        userAvatarInitials: "WC",
    };

    console.log({
        clientId,
        user,
        data,
    });

    useMemo(async () => {
        const res = await fetch("https://webchat-mockbot.azurewebsites.net/directline/token", { method: "POST" });
        const data = await res.json();

        // const CONVERSATION_ID_KEY = "spinoco-webchat-plugin-conversationId";
        // let conversationId;
        // if (window.localStorage.getItem(CONVERSATION_ID_KEY)) {
        //     console.log("from local storage", window.localStorage.getItem(CONVERSATION_ID_KEY));
        //     conversationId = window.localStorage.getItem(CONVERSATION_ID_KEY);
        // } else {
        //     console.log("from data", data.conversationID);
        //     window.localStorage.setItem(CONVERSATION_ID_KEY, data.conversationID);
        //     conversationId = data.conversationID;
        // }

        setDirectLine(createDirectLine({ token: data.token, watermark: "0", conversationId: data.conversationId }));
    }, []);

    return (
        <div className="swp-wrapper">
            {directLine ? (
                <div className={`${opened ? "" : "swp-hidden"}`}>
                    <div
                        className="swp-header"
                        onClick={() => {
                            setOpened(false);
                        }}
                    >
                        ClientId: {clientId}
                    </div>
                    <ReactWebChat
                        // avatarMiddleware={avatarMiddleware}
                        username={user?.name}
                        locale={getLocale()}
                        styleOptions={styleOptions}
                        directLine={directLine}
                        store={store}
                    />
                </div>
            ) : null}

            {!opened ? (
                <div
                    onClick={() => {
                        setOpened(true);
                    }}
                    className="swp-trigger"
                ></div>
            ) : null}
        </div>
    );
};
