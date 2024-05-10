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
import { PopoverDto } from "./models/dtos/popover-dto";
import { ConversationService } from "./models/services/conversation/conversation-service";
import { StoreService } from "./models/services/store/store-service";
import { LocaleService } from "./models/services/locale/locale-service";
import { createChatBoxWrapperCssVariables } from "./models/styles/create-chat-box-wrapper-css-variables";
import { BotDto } from "./models/dtos/bot-dto";
import { createAvatarMiddleware } from "./middlewares/create-avatar-middleware";
import { createChatBoxLoaderProperties } from "./models/styles/create-chat-box-loader-properties";
import { GlobalEventService } from "./models/services/global-event-service/global-event-service";
import { Popover } from "./components/popover";
import { FeedbackConfigurationInterface } from "./models/interfaces/configuration/feedback-configuration-interface";
import { FeedbackForm } from "./components/feedback-form/feedback-form";
import { AppState } from "./models/enums/app-state";
import { ChatState } from "./models/enums/chat-state";
import { createChatBoxLoaderWrapperCssVariables } from "./models/styles/create-chat-box-loader-wrapper-css-variables";
import { ChatStorage } from "./models/services/storage/chat-storage";

interface AppProps {
    chatStorage: ChatStorage;
    configuration: ConfigurationInterface;
    customer?: CustomerDto;
    bot: BotDto;
    popover: PopoverDto;
    conversationService: ConversationService;
    localeService: LocaleService;
    storeService: StoreService;
    globalEventService: GlobalEventService;
}

interface PopoverInterface {
    label: string;
    buttonLabel?: string;
}

export const App: React.FC<AppProps> = (props) => {
    const [appState, setAppState] = useState<AppState>(AppState.Loading);
    const [chatState, setChatState] = useState<ChatState>(ChatState.Closed);

    const [directLine, setDirectLine] = useState<DirectLine>();
    const [popover, setPopover] = useState<PopoverInterface>();

    const [hasConversationStarted, setHasConversationStarted] = useState<boolean>(false);
    const [feedbackConfiguration, setFeedbackConfiguration] = useState<FeedbackConfigurationInterface>();

    props.conversationService.onDirectLineCreated = (directLine) => {
        setDirectLine(directLine);
    };

    props.storeService.onConversationLoaded = () => {
        setAppState(AppState.Loaded);
        setChatState(ChatState.Opened);
    };

    const openChat = async () => {
        setChatState(ChatState.Loading);
        await props.conversationService.startConversation();
        setHasConversationStarted(true);
    };

    const fetchFeedbackConfiguration = async (feedbackInstanceId: string) => {
        const feedbackConfiguration: FeedbackConfigurationInterface = await fetch(
            `${config.feedbackApiUrl}${feedbackInstanceId}`,
        ).then((res) => res.json());
        setFeedbackConfiguration(feedbackConfiguration);
        setAppState(AppState.Feedback);
    };

    props.storeService.onFeedback = async (feedbackInstanceId) => {
        await fetchFeedbackConfiguration(feedbackInstanceId);
    };

    props.globalEventService.onShowPopover = (label, buttonLabel, delay) => {
        setPopover({
            label,
            buttonLabel,
        });
        setTimeout(
            () => {
                if (!hasConversationStarted) {
                    setAppState(AppState.Popover);
                }
            },
            delay ? delay * 1000 : 0,
        );
    };

    props.globalEventService.onShowFeedback = async () => {
        await fetchFeedbackConfiguration("demo-feedback-instance-id.json");
    };

    useEffect(() => {
        if (props.chatStorage.getChatState() == ChatState.Opened) {
            openChat();
        }

        if (props.popover.shouldShowPopover()) {
            props.globalEventService.showPopover(
                props.popover.label as string,
                props.popover.buttonLabel,
                props.popover.delay,
            );
        }
    }, []);

    useEffect(() => {
        props.chatStorage.setChatState(chatState);
    }, [appState, chatState]);

    return (
        <div
            className={createChatBoxWrapperClasses(props.configuration)}
            style={createWrapperCssVariables(props.configuration)}
        >
            <Trigger
                configuration={props.configuration}
                setOpened={() => openChat()}
                conversationService={props.conversationService}
            />

            {appState === AppState.Popover && !hasConversationStarted && (
                <Popover
                    label={popover?.label ?? ""}
                    configuration={props.configuration}
                    buttonLabel={popover?.buttonLabel}
                    onClose={() => {
                        setChatState(ChatState.Closed);
                        setAppState(AppState.Loaded);
                    }}
                    onClick={() => openChat()}
                />
            )}

            <div
                className={config.classes.chatBoxWrapper}
                style={createChatBoxWrapperCssVariables(
                    chatState === ChatState.Opened || chatState === ChatState.Loading,
                    props.configuration,
                )}
            >
                <Header
                    configuration={props.configuration}
                    onClose={() => {
                        setChatState(ChatState.Closed);
                    }}
                />

                {directLine && (
                    <ReactWebChat
                        className={config.classes.chat}
                        avatarMiddleware={createAvatarMiddleware(props.bot)}
                        sendTypingIndicator={true}
                        typingIndicatorMiddleware={botTypingIndicatorMiddleware}
                        username={props.customer?.username}
                        locale={props.localeService.locale}
                        styleOptions={createStyleOptions(props.configuration)}
                        directLine={directLine}
                        store={props.storeService.store}
                    />
                )}

                {chatState === ChatState.Loading && (
                    <div
                        style={createChatBoxLoaderWrapperCssVariables(
                            !directLine && props.configuration.directLine.useMockbot,
                            props.configuration.root,
                        )}
                        className={config.classes.chatBoxLoaderWrapper}
                    >
                        <div className={config.classes.chatBoxLoader}>
                            <div style={createChatBoxLoaderProperties(props.configuration)}></div>
                            <div style={createChatBoxLoaderProperties(props.configuration)}></div>
                            <div style={createChatBoxLoaderProperties(props.configuration)}></div>
                            <div style={createChatBoxLoaderProperties(props.configuration)}></div>
                        </div>
                    </div>
                )}
            </div>

            {appState === AppState.Feedback && feedbackConfiguration && (
                <FeedbackForm
                    configuration={props.configuration}
                    feedbackConfiguration={feedbackConfiguration}
                    onClose={() => {
                        setChatState(ChatState.Closed);
                        setAppState(AppState.Loaded);
                    }}
                />
            )}
        </div>
    );
};
