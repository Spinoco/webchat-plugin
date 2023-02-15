import React, { useMemo, useState } from "react";
import { ConfigurationInterface } from "./models/interfaces/configuration-interface";
import ReactWebChat from "botframework-webchat";
import { DirectLine } from "botframework-directlinejs";
import { UserInterface } from "./models/interfaces/user-interface";
import { getLocale } from "./models/chat/get-locale";
import { avatarMiddleware } from "./middlewares/avatar-middleware";
import { createStore } from "./models/chat/create-store";
import { createStyleOptions } from "./models/styles/create-style-options";
import { botTypingIndicatorMiddleware } from "./middlewares/bot-typing-indicator-middleware";
import { Header } from "./components/header";
import { createStyleFeaturesClasses } from "./models/styles/create-style-feature-classes";
import { createWrapperCssVariables } from "./models/styles/create-wrapper-css-variables";
import { createSpinocoDirectLine } from "./models/chat/create-spinoco-direct-line";
import { ConversationIdStorage } from "./models/services/conversation-id-storage";
import { Trigger } from "./components/trigger";
import { config } from "./config/config";
import { createChatClasses } from "./models/styles/create-chat-classes";

const store = createStore();

interface AppProps {
    configuration: ConfigurationInterface;
    user?: UserInterface;
    clientId: string;
}

const echoBotToken = import.meta.env.VITE_ECHO_BOT_TOKEN;

export const App: React.FC<AppProps> = ({ clientId, configuration, user }) => {
    const [opened, setOpened] = useState(false);
    const [directLine, setDirectLine] = useState<DirectLine>();

    const create = async () => {
        if (echoBotToken.length > 0) {
            setDirectLine(createSpinocoDirectLine(echoBotToken));
        } else {
            const mockBotUrl = "https://webchat-mockbot.azurewebsites.net/directline/token";
            const res = await fetch(mockBotUrl, { method: "POST" });
            const data = await res.json();
            setDirectLine(createSpinocoDirectLine(data.token));
        }
    };

    useMemo(async () => {
        create();
    }, []);

    window.addEventListener("error", (event) => {
        if (
            event.error?.response?.error?.code == "BadArgument" &&
            (event.error?.response?.error?.message === "Conversation not found" ||
                event.error?.response?.error?.message === "Token not valid for this conversation")
        ) {
            ConversationIdStorage.remove();
            create();
        }
    });

    return (
        <div className={config.classes.chatWrapper} style={createWrapperCssVariables(configuration)}>
            {directLine ? (
                <div className={`${opened ? "" : config.classes.hideWrapper}`}>
                    <Header clientId={clientId} configuration={configuration} setOpened={setOpened} />
                    <ReactWebChat
                        className={createChatClasses(configuration)}
                        avatarMiddleware={avatarMiddleware}
                        sendTypingIndicator={true}
                        typingIndicatorMiddleware={botTypingIndicatorMiddleware}
                        username={user?.name}
                        locale={getLocale()}
                        styleOptions={createStyleOptions(configuration, user)}
                        directLine={directLine}
                        store={store}
                    />
                </div>
            ) : null}

            {!opened ? <Trigger configuration={configuration} setOpened={setOpened} /> : null}
        </div>
    );
};
