import React, { useEffect, useState } from "react";
import { ConfigurationInterface } from "./models/interfaces/configuration/configuration-interface";
import ReactWebChat from "botframework-webchat";
import { DirectLine } from "botframework-directlinejs";
import { getLocale } from "./models/chat/get-locale";
import { avatarMiddleware } from "./middlewares/avatar-middleware";
import { createStore } from "./models/chat/create-store";
import { createStyleOptions } from "./models/styles/create-style-options";
import { botTypingIndicatorMiddleware } from "./middlewares/bot-typing-indicator-middleware";
import { Header } from "./components/header";
import { createWrapperCssVariables } from "./models/styles/create-wrapper-css-variables";
import { Trigger } from "./components/trigger";
import { config } from "./config/config";
import { createChatClasses } from "./models/styles/create-chat-classes";
import { UserDto } from "./models/dtos/user-dto";
import ChatStorage from "./models/services/storage/chat-storage";
import { ConversationService } from "./models/services/conversation/conversation-service";

const store = createStore();

interface AppProps {
    configuration: ConfigurationInterface;
    user?: UserDto;
    clientId: string;
}

const directLineService = new ConversationService(ChatStorage.getInstance());

export const App: React.FC<AppProps> = ({ clientId, configuration, user }) => {
    const [opened, setOpened] = useState(false);
    const [directLine, setDirectLine] = useState<DirectLine>();

    directLineService.onConversationChange = (directLine) => {
        setDirectLine(directLine);
    };

    useEffect(() => {
        directLineService.startConversation();
    }, []);

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
