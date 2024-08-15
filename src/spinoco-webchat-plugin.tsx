import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import { ConfigurationInterface } from "./models/interfaces/configuration/configuration-interface";
import { ChatDomService } from "./models/services/dom/chat-dom-service";
import { ConversationService } from "./models/services/conversation/conversation-service";
import { ChatStorage } from "./models/services/storage/chat-storage";
import { LocaleService } from "./models/services/locale/locale-service";
import { StoreService } from "./models/services/store/store-service";
import { FailedToLoadConfigurationError } from "./models/error/failed-to-load-configuration-error";
import { config } from "./config/config";
import { GlobalEventService } from "./models/services/global-event-service/global-event-service";
import "./styles/app.scss";

declare global {
    interface Window {
        spinocoWebchatPlugin: GlobalEventService;
    }
}

const chatDomService = new ChatDomService(config.chat.wrapperElementHtmlId);

const createWithConfigUrl = (url: string) => {
    const localeService = new LocaleService(chatDomService);
    const storeService = new StoreService(localeService, chatDomService);
    const globalEventService = (window.spinocoWebchatPlugin = new GlobalEventService());

    fetch(`${url}`)
        .then((response) => response.json())
        .then((configuration: ConfigurationInterface) => {
            const directLineSecret = configuration.directLine.secret;
            if (!directLineSecret) {
                configuration.directLine.useMockbot = true;
            }
            const chatStorage = ChatStorage.getInstance();
            const conversationService = new ConversationService(chatStorage, configuration.directLine);

            ReactDOM.createRoot(chatDomService.wrapperElement).render(
                <React.StrictMode>
                    <App
                        chatStorage={chatStorage}
                        storeService={storeService}
                        localeService={localeService}
                        conversationService={conversationService}
                        customer={chatDomService.getCustomerDto()}
                        bot={chatDomService.getBotDto()}
                        popover={chatDomService.getPopoverDto()}
                        configuration={configuration}
                        globalEventService={globalEventService}
                        domService={chatDomService}
                    />
                </React.StrictMode>,
            );
        })
        .catch((e) => {
            throw new FailedToLoadConfigurationError(e.message);
        });
};

const clientId = chatDomService.getClientId();
const configUrl = chatDomService.getConfigUrl();
if (clientId) {
    createWithConfigUrl(`${config.chat.apiUrl}/${clientId}.json`);
} else if (configUrl) {
    createWithConfigUrl(`${configUrl}`);
} else {
    throw new FailedToLoadConfigurationError("Missing one of attributes: data-client-id, data-config-url.");
}
