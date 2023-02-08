import React, { useMemo, useState } from "react";
import { ConfigurationInterface } from "./interfaces/configuration-interface";
import ReactWebChat, { createDirectLine } from "botframework-webchat";
import { DirectLine } from "botframework-directlinejs";
import { UserInterface } from "./interfaces/user-interface";
import { getLocale } from "./utils/get-locale";
import { avatarMiddleware } from "./middlewares/avatar-middleware";
import { createStore } from "./models/create-store";
import { createStyleOptions } from "./models/create-style-options";
import { botTypingIndicatorMiddleware } from "./middlewares/bot-typing-indicator-middleware";
import { Header } from "./components/header";

const store = createStore();

interface AppProps {
    configuration: ConfigurationInterface;
    user?: UserInterface;
    clientId: string;
}

export const App: React.FC<AppProps> = ({ clientId, configuration, user }) => {
    const [opened, setOpened] = useState(false);
    const [directLine, setDirectLine] = useState<DirectLine>();

    useMemo(async () => {
        const res = await fetch("https://webchat-mockbot.azurewebsites.net/directline/token", { method: "POST" });
        const data = await res.json();
        setDirectLine(createDirectLine({ token: data.token, watermark: "0", conversationId: data.conversationId }));
    }, []);

    const styleOptions = createStyleOptions(configuration, user);

    return (
        <div className="swp-wrapper">
            {directLine ? (
                <div className={`${opened ? "" : "swp-hidden"}`}>
                    <Header clientId={clientId} configuration={configuration} setOpened={setOpened} />
                    <ReactWebChat
                        avatarMiddleware={avatarMiddleware}
                        sendTypingIndicator={true}
                        typingIndicatorMiddleware={botTypingIndicatorMiddleware}
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
                    style={{ backgroundColor: configuration.primaryColor }}
                    onClick={() => {
                        setOpened(true);
                    }}
                    className="swp-trigger"
                ></div>
            ) : null}
        </div>
    );
};
