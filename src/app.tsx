import React, { useEffect, useState } from "react";
import { ConfigurationInterface } from "./models/interfaces/configuration/configuration-interface";
import ReactWebChat from "botframework-webchat";
import { DirectLine } from "botframework-directlinejs";
import { createStyleOptions } from "./models/styles/create-style-options";
import { botTypingIndicatorMiddleware } from "./middlewares/bot-typing-indicator-middleware";
import { Header } from "./components/header";
import { createWrapperCssVariables } from "./models/styles/create-wrapper-css-variables";
import { Trigger } from "./components/trigger";
import { config } from "./config/config";
import { createChatBoxWrapperClasses } from "./models/styles/create-chat-box-wrapper-classes";
import { CustomerDto } from "./models/dtos/customer-dto";
import { ConversationService } from "./models/services/conversation/conversation-service";
import { StoreService } from "./models/services/store/store-service";
import { LocaleService } from "./models/services/locale/locale-service";
import { createChatBoxWrapperCssVariables } from "./models/styles/create-chat-box-wrapper-css-variables";
import { BotDto } from "./models/dtos/bot-dto";
import { createAvatarMiddleware } from "./middlewares/create-avatar-middleware";
import { createChatBoxLoaderProperties } from "./models/styles/create-chat-box-loader-properties";

interface AppProps {
    configuration: ConfigurationInterface;
    customer?: CustomerDto;
    bot: BotDto;
    clientId: string;
    conversationService: ConversationService;
    localeService: LocaleService;
    storeService: StoreService;
}

export const App: React.FC<AppProps> = (props) => {
    const [opened, setOpened] = useState(false);
    const [directLine, setDirectLine] = useState<DirectLine>();
    const [isConversationLoaded, setIsConversationLoaded] = useState(false);

    props.conversationService.onConversationChange = (directLine) => {
        setDirectLine(directLine);
        console.log("directline set");
    };

    props.storeService.onConversationLoaded = () => {
        setIsConversationLoaded(true);
    };

    return (
        <div
            className={createChatBoxWrapperClasses(props.configuration)}
            style={createWrapperCssVariables(props.configuration)}
        >
            {directLine ? (
                <div className={config.classes.chatBoxWrapper} style={createChatBoxWrapperCssVariables(opened)}>
                    <Header clientId={props.clientId} configuration={props.configuration} setOpened={setOpened} />
                    <ReactWebChat
                        className={config.classes.chat}
                        avatarMiddleware={createAvatarMiddleware(props.bot)}
                        sendTypingIndicator={true}
                        typingIndicatorMiddleware={botTypingIndicatorMiddleware}
                        username={props.customer?.name}
                        locale={props.localeService.locale}
                        styleOptions={createStyleOptions(props.configuration, props.customer)}
                        directLine={directLine}
                        store={props.storeService.store}
                    />

                    {opened && !isConversationLoaded && (
                        <div className={config.classes.chatBoxLoaderWrapper}>
                            <div className={config.classes.chatBoxLoader}>
                                <div style={createChatBoxLoaderProperties(props.configuration)}></div>
                                <div style={createChatBoxLoaderProperties(props.configuration)}></div>
                                <div style={createChatBoxLoaderProperties(props.configuration)}></div>
                                <div style={createChatBoxLoaderProperties(props.configuration)}></div>
                            </div>
                        </div>
                    )}
                </div>
            ) : null}

            {!opened && !isConversationLoaded && (
                <Trigger
                    configuration={props.configuration}
                    conversationService={props.conversationService}
                    setOpened={setOpened}
                />
            )}
        </div>
    );
};
