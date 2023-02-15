import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigurationInterface } from "./models/interfaces/configuration-interface";
import { App } from "./app";
import { UserDto } from "./models/dtos/user-dto";
import { config } from "./config/config";
import "./styles/app.scss";

// find wrapper element
const wrapperElement = document.getElementById(config.chat.id);
if (!wrapperElement) {
    throw new Error('Spinoco webchat plugin: No div with "spinoco-webchat-plugin" id found.');
}

// get client identification
const clientId = wrapperElement.getAttribute(config.chat.attributes.clientId);
if (!clientId) {
    throw new Error(`Spinoco webchat plugin: Please set data-client-id on div with id "spinoco-webchat-plugin".`);
}

// fetch configuration from API
fetch(`${config.chat.apiUrl}/${clientId}.json`)
    .then((response) => response.json())
    .then((configuration) => {
        ReactDOM.createRoot(wrapperElement).render(
            <React.StrictMode>
                <App
                    clientId={clientId}
                    user={UserDto.createFromWrapperElement(wrapperElement)}
                    configuration={configuration as ConfigurationInterface}
                />
            </React.StrictMode>,
        );
        console.log("Spinoco webchat plugin: sucessfully initialized.");
    })
    .catch(() => {
        throw new Error(`Spinoco webchat plugin: Failed to load configuration for clientId "${clientId}".`);
    });
