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
import "./styles/app.scss";

const chatDomService = new ChatDomService(config.chat.id);
const clientId = chatDomService.getClientId();

const localeService = new LocaleService();
const storeService = new StoreService(localeService);

fetch(`${config.chat.apiUrl}/${clientId}.json`)
    .then((response) => response.json())
    .then((configuration: ConfigurationInterface) => {
        const directLineSecret = configuration.directLine.secret;
        if (!directLineSecret) {
            configuration.directLine.useMockbot = true;
        }
        const conversationService = new ConversationService(ChatStorage.getInstance(), configuration.directLine);

        ReactDOM.createRoot(chatDomService.wrapperElement).render(
            <React.StrictMode>
                <App
                    storeService={storeService}
                    localeService={localeService}
                    conversationService={conversationService}
                    clientId={clientId}
                    customer={chatDomService.getCustomerDto()}
                    bot={chatDomService.getBotDto()}
                    configuration={configuration}
                />
            </React.StrictMode>,
        );
    })
    .catch((e) => {
        throw new FailedToLoadConfigurationError(e.message);
    });
