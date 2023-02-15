import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigurationInterface } from "./models/interfaces/configuration-interface";
import { createUserFromWrapperData } from "./models/chat/create-user-from-wrapper-data";
import { App } from "./app";
import "./styles/app.sass";

const WEBCHAT_PLUGIN_ID = "spinoco-webchat-plugin";

// find wrapper element
const wrapperElement = document.getElementById(WEBCHAT_PLUGIN_ID);
if (!wrapperElement) {
    throw new Error('Spinoco webchat plugin: No div with "spinoco-webchat-plugin" id found.');
}

// get client identification
const clientId = wrapperElement.getAttribute("data-client-id");
if (!clientId) {
    throw new Error(`Spinoco webchat plugin: Please set data-client-id on div with id "spinoco-webchat-plugin".`);
}

// create user from wrapper data
const user = createUserFromWrapperData(wrapperElement);

// fetch configuration from API
fetch(`${import.meta.env.VITE_WEBCHAT_API_URL}/${clientId}.json`)
    .then((response) => response.json())
    .then((configuration) => {
        ReactDOM.createRoot(wrapperElement).render(
            <React.StrictMode>
                <App clientId={clientId} user={user} configuration={configuration as ConfigurationInterface} />
            </React.StrictMode>,
        );
        console.log("Spinoco webchat plugin: sucessfully initialized.");
    })
    .catch(() => {
        throw new Error(`Spinoco webchat plugin: Failed to load configuration for clientId "${clientId}".`);
    });
