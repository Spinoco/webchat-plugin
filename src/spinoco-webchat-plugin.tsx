import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigurationInterface } from "./models/interfaces/configuration/configuration-interface";
import { App } from "./app";
import { config } from "./config/config";
import { ChatDomService } from "./models/services/dom/chat-dom-service";
import "./styles/app.scss";

const chatDomService = new ChatDomService(config.chat.id);
const clientId = chatDomService.getClientId();

// fetch configuration from API
fetch(`${config.chat.apiUrl}/${clientId}.json`)
    .then((response) => response.json())
    .then((configuration) => {
        ReactDOM.createRoot(chatDomService.wrapperElement).render(
            <React.StrictMode>
                <App
                    clientId={clientId}
                    user={chatDomService.getUserDto()}
                    configuration={configuration as ConfigurationInterface}
                />
            </React.StrictMode>,
        );
        console.log("Spinoco webchat plugin: sucessfully initialized.");
    })
    .catch(() => {
        throw new Error(`Spinoco webchat plugin: Failed to load configuration for clientId "${clientId}".`);
    });
