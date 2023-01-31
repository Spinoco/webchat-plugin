import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigurationInterface } from "./interfaces/configuration-interface";
import { UserInterface } from "./interfaces/user-interface";
import { App } from "./app";
import "./styles/app.sass";

const CHAT_ID = "spinoco-webchat-plugin";

// FIXME: value should depend on NODE_ENV
const API_URL = "";

// find wrapper element
const wrapperElement = document.getElementById(CHAT_ID);
if (!wrapperElement) {
    throw new Error('Spinoco webchat plugin: No div with "spinoco-webchat-plugin" id found.');
}

// get client and user identification
const clientId = wrapperElement.getAttribute("data-client-id");
if (!clientId) {
    throw new Error(`Spinoco webchat plugin: Please set data-client-id on div with id "spinoco-webchat-plugin".`);
}

const userName = wrapperElement.getAttribute("data-user-name");
const userEmail = wrapperElement.getAttribute("data-user-email");
let user: UserInterface | undefined = undefined;
if (userName && userName.length && userEmail && userEmail.length) {
    user = {
        name: userName,
        email: userEmail,
    };
}

// fetch configuration from API
const configurationRequest = fetch(`${API_URL}/${clientId}.json`);
configurationRequest.then((configurationResponse) => {
    configurationResponse.json().then((configuration) => {
        // render react webchat plugin into wrapper element
        ReactDOM.createRoot(wrapperElement).render(
            <React.StrictMode>
                <App clientId={clientId} user={user} data={configuration as ConfigurationInterface} />
            </React.StrictMode>,
        );

        console.log("Spinoco webchat sucessfully initialized.");
    });
});
