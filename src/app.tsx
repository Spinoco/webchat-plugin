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

interface AppProps {
    configuration: ConfigurationInterface;
    customer?: CustomerDto;
    bot: BotDto;
    popover: PopoverDto;
    clientId: string;
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
    const [state, setState] = useState<AppState>(AppState.Loading);
    const [directLine, setDirectLine] = useState<DirectLine>();
    const [popover, setPopover] = useState<PopoverInterface>();
    const [feedbackConfiguration, setFeedbackConfiguration] = useState<FeedbackConfigurationInterface>();

    props.conversationService.onConversationChange = (directLine) => {
        setDirectLine(directLine);
    };

    props.storeService.onConversationLoaded = () => {
        setState(AppState.Loaded);
    };

    const fetchFeedbackConfiguration = async (feedbackInstanceId: string) => {
        const feedbackConfiguration: FeedbackConfigurationInterface = await fetch(
            `${config.feedbackApiUrl}${feedbackInstanceId}`,
        ).then((res) => res.json());
        setFeedbackConfiguration(feedbackConfiguration);
        setState(AppState.Feedback);
    };

    props.storeService.onFeedback = (feedbackInstanceId) => {
        fetchFeedbackConfiguration(feedbackInstanceId);
    };

    props.globalEventService.onShowPopover = (label, buttonLabel, delay) => {
        setPopover({
            label,
            buttonLabel,
        });
        setTimeout(() => setState(AppState.Popover), delay ? delay * 1000 : 0);
    };

    props.globalEventService.onShowFeedback = () => {
        fetchFeedbackConfiguration("demo-feedback-instance-id.json");
    };

    useEffect(() => {
        if (props.popover.shouldShowPopover()) {
            props.globalEventService.showPopover(
                props.popover.label as string,
                props.popover.buttonLabel,
                props.popover.delay,
            );
        }
    }, []);

    return (
        <div
            className={createChatBoxWrapperClasses(props.configuration)}
            style={createWrapperCssVariables(props.configuration)}
        >
            <Trigger
                configuration={props.configuration}
                setOpened={() => setState(AppState.ChatOpen)}
                conversationService={props.conversationService}
            />

            {state === "popover" && (
                <Popover
                    clientId={props.clientId}
                    label={popover?.label ?? ""}
                    configuration={props.configuration}
                    buttonLabel={popover?.buttonLabel}
                    onClose={() => setState(AppState.Loaded)}
                    onClick={() => setState(AppState.ChatOpen)}
                />
            )}

            <div
                className={config.classes.chatBoxWrapper}
                style={createChatBoxWrapperCssVariables(state === "chatOpen" || state === "loaded")}
            >
                <Header
                    clientId={props.clientId}
                    configuration={props.configuration}
                    onClose={() => {
                        setState(AppState.ChatClosed);
                    }}
                />

                {directLine && (
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
                )}

                {state === "chatOpen" && (
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

            {state === "feedback" && feedbackConfiguration && (
                <FeedbackForm
                    configuration={props.configuration}
                    feedbackConfiguration={feedbackConfiguration}
                    clientId={props.clientId}
                    onClose={() => setState(AppState.ChatOpen)}
                />
            )}
        </div>
    );
};
