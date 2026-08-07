import React, { useEffect, useMemo, useState } from "react";
import { ConfigurationInterface } from "./models/interfaces/configuration/configuration-interface";
import ReactWebChat from "botframework-webchat";
import { DirectLine } from "botframework-directlinejs";
import { Store } from "redux";
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
import { UrlNavigationService } from "./models/services/dom/url-navigation-service";
import { WebchatContextService } from "./models/services/context/webchat-context-service";
import { WebchatContextInterface } from "./models/interfaces/context/webchat-context-interface";
import { ChatConversationStartPayloadInterface } from "./models/interfaces/conversation/chat-conversation-start-payload-interface";

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
    urlNavigationService: UrlNavigationService;
    webchatContextService: WebchatContextService;
    isFullScreen: boolean;
}

interface PopoverInterface {
    label: string;
    buttonLabel?: string;
}

interface ConversationInterface {
    /** Direct line of the conversation. */
    directLine: DirectLine;

    /** Store that holds the state (ie. the transcript) of the conversation. */
    store: Store;

    /**
     * Distinguishes the conversations from each other, so the chat is re-mounted whenever the
     * conversation is replaced and does not carry over anything of the previous one.
     */
    generation: number;
}

export const App: React.FC<AppProps> = (props) => {
    const [appState, setAppState] = useState<AppState>(AppState.Loading);
    const [chatState, setChatState] = useState<ChatState>(ChatState.Closed);

    const [conversation, setConversation] = useState<ConversationInterface>();
    const [popover, setPopover] = useState<PopoverInterface>();

    const [hasConversationStarted, setHasConversationStarted] = useState<boolean>(false);
    const [feedbackConfiguration, setFeedbackConfiguration] = useState<FeedbackConfigurationInterface>();

    // context that was handed over in the url, that the user has to confirm before we act on it
    const [contextToConfirm, setContextToConfirm] = useState<WebchatContextInterface>();

    // the configuration and the bot do not change once the plugin is loaded, while a new identity
    // of these props re-renders the whole chat - which every state of this component would do
    const styleOptions = useMemo(() => createStyleOptions(props.configuration), []);
    const avatarMiddleware = useMemo(() => createAvatarMiddleware(props.bot), []);

    props.conversationService.onDirectLineCreated = (directLine) => {
        // the store belongs to the conversation, so both are handed over to the chat at once,
        // otherwise the chat could render the store of one conversation with the direct line of another
        setConversation((current) => ({
            directLine,
            store: props.storeService.store,
            generation: (current?.generation ?? 0) + 1,
        }));
    };

    props.storeService.onConversationLoaded = () => {
        setAppState(AppState.Loaded);
        setChatState(ChatState.Opened);
    };

    /**
     * Opens the chat on a conversation.
     *
     * The conversation that is already running is resumed, unless it is to be replaced - then it
     * is dropped together with its transcript and a brand new one is started in its place.
     */
    const openChat = async (startPayload?: ChatConversationStartPayloadInterface, replaceRunning = false) => {
        setChatState(ChatState.Loading);
        if (startPayload) {
            // the payload belongs to the conversation we are about to start, so it goes with its store
            props.storeService.recreateStore(startPayload);
        }
        await (replaceRunning
            ? props.conversationService.replaceConversation()
            : props.conversationService.startConversation());
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

    props.globalEventService.onOpenChat = async () => {
        openChat();
    };

    useEffect(() => {
        const context = props.webchatContextService.getContext();
        // there is no conversation to be replaced, so the conversation of the context may be
        // started right away, otherwise the user has to confirm that we may replace it
        const hasConversation = props.conversationService.hasStoredConversation();

        // If there is payload with which we should start the chat immediately
        // this is only used when there was no conversation previously, and we do not need confirmation dialog.
        const startPayload =
            context && !hasConversation ? props.webchatContextService.createStartPayload(context) : undefined;

        if (context && hasConversation) {
            setContextToConfirm(context);
        }

        // we are opening chat on the new page only if it was opened before and if the chat is not in fullscreen mode
        const shallOpenChat = !props.isFullScreen && props.chatStorage.getChatState() == ChatState.Opened;

        // Only open the chat directly when -
        // We had stored that chat was already opened.
        // The chat fully embeded
        // We received chat payload from url.
        if (shallOpenChat || props.configuration.features?.embedded || startPayload) {
            openChat(startPayload);
        }

        // When we presented full screen question, do not present the small popover.
        if (!context && props.popover.shouldShowPopover()) {
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

    useEffect(() => {
        props.urlNavigationService.initialize();
    }, []);

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

            {contextToConfirm && (
                <Popover
                    label={contextToConfirm.question}
                    configuration={props.configuration}
                    buttonLabel={contextToConfirm.yesLabel ?? config.questionDialog.yesLabel}
                    dismissLabel={contextToConfirm.noLabel ?? config.questionDialog.noLabel}
                    fullscreen
                    onClose={() => setContextToConfirm(undefined)}
                    onClick={() => {
                        const startPayload = props.webchatContextService.createStartPayload(contextToConfirm);
                        setContextToConfirm(undefined);
                        openChat(startPayload, true);
                    }}
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

                {conversation && (
                    <ReactWebChat
                        key={conversation.generation}
                        className={config.classes.chat}
                        avatarMiddleware={avatarMiddleware}
                        sendTypingIndicator={true}
                        typingIndicatorMiddleware={botTypingIndicatorMiddleware}
                        username={props.customer?.username}
                        locale={props.localeService.locale}
                        styleOptions={styleOptions}
                        directLine={conversation.directLine}
                        store={conversation.store}
                    />
                )}

                {chatState === ChatState.Loading && (
                    <div
                        style={createChatBoxLoaderWrapperCssVariables(
                            !conversation && props.configuration.directLine.useMockbot,
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
