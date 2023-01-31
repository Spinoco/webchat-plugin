import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigurationInterface } from "./interfaces/configuration-interface";
import { UserInterface } from "./interfaces/user-interface";
import { App } from "./app";
import "./styles/app.sass";

const CHAT_ID = "spinoco-webchat-plugin";

// FIXME: value should depend on NODE_ENV
const API_URL = "";

// create wrapper element
const chatWrapperElement = document.getElementById(CHAT_ID);

// init
if (chatWrapperElement) {
    // get client and user identification

    const clientId = chatWrapperElement.getAttribute("data-client-id");
    if (!clientId) {
        console.log(`Spinoco webchat plugin: Please set data-client-id on div with id "spinoco-webchat-plugin".`);
    }

    const userName = chatWrapperElement.getAttribute("data-user-name");
    const userEmail = chatWrapperElement.getAttribute("data-user-email");
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
            // render React chat into wrapper element
            ReactDOM.createRoot(chatWrapperElement).render(
                <React.StrictMode>
                    <App clientId={clientId} user={user} data={configuration as ConfigurationInterface} />
                </React.StrictMode>,
            );

            console.log("Spinoco webchat sucessfully initialized.");
        });
    });
} else {
    console.log('Spinoco webchat plugin: No div with "spinoco-webchat-plugin" id found.');
}
