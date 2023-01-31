import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigurationInterface } from "./interfaces/configuration-interface";
import { App } from "./app";
import "./app.sass";

const CHAT_ID = "spinoco-webchat";
const API_URL = "";

// create wrapper element
const chatWrapperElement = document.createElement("div");
chatWrapperElement.setAttribute("id", CHAT_ID);
document.body.appendChild(chatWrapperElement);

// fetch configuration from API
const configurationRequest = fetch(`${API_URL}/configuration-example.json`);
configurationRequest.then((configurationResponse) => {
    configurationResponse.json().then((configuration) => {
        // render React chat into wrapper element
        ReactDOM.createRoot(chatWrapperElement).render(
            <React.StrictMode>
                <App data={configuration as ConfigurationInterface} />
            </React.StrictMode>,
        );

        console.log("Spinoco webchat sucessfully initialized.");
    });
});
