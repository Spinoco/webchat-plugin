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
import { GlobalEventService } from "./models/services/global-event-service/global-event-service";
import { Popover } from "./components/popover";

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
    const [opened, setOpened] = useState(false);
    const [directLine, setDirectLine] = useState<DirectLine>();
    const [isConversationLoaded, setIsConversationLoaded] = useState(false);
    const [showPopover, setShowPopover] = useState(false);
    const [popover, setPopover] = useState<PopoverInterface>();

    props.conversationService.onConversationChange = (directLine) => {
        setDirectLine(directLine);
    };

    props.storeService.onConversationLoaded = () => {
        setIsConversationLoaded(true);
    };

    props.globalEventService.onShowPopover = (label, buttonLabel, delay) => {
        setPopover({
            label,
            buttonLabel,
        });
        setTimeout(() => setShowPopover(true), delay ? delay * 1000 : 0);
    };

    const handlePopoverClick = () => {
        setOpened(true);
        setShowPopover(false);
    };

    useEffect(() => {
        props.conversationService.startConversation();
        if (props.popover.shouldShowPopover()) {
            props.globalEventService.showPopover(
                props.popover.label as string,
                props.popover.buttonLabel,
                props.popover.delay,
            );
        }
    }, []);

    const showTriggerButton = isConversationLoaded && !opened;

    return (
        <div
            className={createChatBoxWrapperClasses(props.configuration)}
            style={createWrapperCssVariables(props.configuration)}
        >
            {directLine ? (
                <div
                    className={config.classes.chatBoxWrapper}
                    style={createChatBoxWrapperCssVariables(opened && isConversationLoaded)}
                >
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
                </div>
            ) : null}

            {showTriggerButton ? <Trigger configuration={props.configuration} setOpened={setOpened} /> : null}

            {showPopover && (
                <Popover
                    clientId={props.clientId}
                    label={popover?.label ?? ""}
                    configuration={props.configuration}
                    buttonLabel={popover?.buttonLabel}
                    onClose={() => setShowPopover(false)}
                    onClick={handlePopoverClick}
                />
            )}
        </div>
    );
};
