import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigurationInterface } from "./models/interfaces/configuration/configuration-interface";
import { App } from "./app";
import { config } from "./config/config";
import { ChatDomService } from "./models/services/dom/chat-dom-service";
import "./styles/app.scss";
import { ConversationService } from "./models/services/conversation/conversation-service";
import ChatStorage from "./models/services/storage/chat-storage";
import { LocaleService } from "./models/services/locale/locale-service";
import { StoreService } from "./models/services/store/store-service";

const chatDomService = new ChatDomService(config.chat.id);
const clientId = chatDomService.getClientId();

const localeService = new LocaleService();
const storeService = new StoreService(localeService);

fetch(`${config.chat.apiUrl}/${clientId}.json`)
    .then((response) => response.json())
    .then((configuration: ConfigurationInterface) => {
        const directLineSecret = configuration.directLine.secret;
        if (!directLineSecret) {
            throw new Error("Spinoco webchat plugin: Failed to load directLine secret.");
        }
        const conversationService = new ConversationService(ChatStorage.getInstance(), configuration.directLine.secret);

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
        console.log("Spinoco webchat plugin: sucessfully initialized.");
    })
    .catch(() => {
        throw new Error(`Spinoco webchat plugin: Failed to load configuration for clientId "${clientId}".`);
    });
