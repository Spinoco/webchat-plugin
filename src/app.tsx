import React, { useEffect, useState } from "react";
import { ConfigurationInterface } from "./models/interfaces/configuration/configuration-interface";
import ReactWebChat from "botframework-webchat";
import { DirectLine } from "botframework-directlinejs";
import { avatarMiddleware } from "./middlewares/avatar-middleware";
import { createStyleOptions } from "./models/styles/create-style-options";
import { botTypingIndicatorMiddleware } from "./middlewares/bot-typing-indicator-middleware";
import { Header } from "./components/header";
import { createWrapperCssVariables } from "./models/styles/create-wrapper-css-variables";
import { Trigger } from "./components/trigger";
import { config } from "./config/config";
import { createChatClasses } from "./models/styles/create-chat-classes";
import { UserDto } from "./models/dtos/user-dto";
import { ConversationService } from "./models/services/conversation/conversation-service";
import { StoreService } from "./models/services/store/store-service";
import { LocaleService } from "./models/services/locale/locale-service";

interface AppProps {
    configuration: ConfigurationInterface;
    user?: UserDto;
    clientId: string;
    conversationService: ConversationService;
    localeService: LocaleService;
    storeService: StoreService;
}

export const App: React.FC<AppProps> = (props) => {
    const [opened, setOpened] = useState(false);
    const [directLine, setDirectLine] = useState<DirectLine>();

    props.conversationService.onConversationChange = (directLine) => {
        setDirectLine(directLine);
    };

    useEffect(() => {
        props.conversationService.startConversation();
    }, []);

    return (
        <div className={config.classes.chatWrapper} style={createWrapperCssVariables(props.configuration)}>
            {directLine ? (
                <div
                    className={
                        config.classes.chatBoxWrapper +
                        ` ${opened ? config.classes.openedWrapper : config.classes.hiddenWrapper}`
                    }
                >
                    <Header clientId={props.clientId} configuration={props.configuration} setOpened={setOpened} />
                    <ReactWebChat
                        className={createChatClasses(props.configuration)}
                        avatarMiddleware={avatarMiddleware}
                        sendTypingIndicator={true}
                        typingIndicatorMiddleware={botTypingIndicatorMiddleware}
                        username={props.user?.name}
                        locale={props.localeService.getLocale()}
                        styleOptions={createStyleOptions(props.configuration, props.user)}
                        directLine={directLine}
                        store={props.storeService.getStore()}
                    />
                </div>
            ) : null}

            {!opened ? <Trigger configuration={props.configuration} setOpened={setOpened} /> : null}
        </div>
    );
};
