import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigurationInterface } from "./interfaces/configuration-interface";
import { App } from "./app";
import "./app.css";

const CHAT_ID = "spinoco-webchat";
const API_URL = "";

// create wrapper element
const chatWrapperElement = document.createElement("div");
chatWrapperElement.setAttribute("id", CHAT_ID);
document.body.appendChild(chatWrapperElement);

// fetch configuration from API
const dataResponse = await fetch(`${API_URL}/configuration-example.json`);
const data = (await dataResponse.json()) as ConfigurationInterface;

// render React chat into wrapper element
ReactDOM.createRoot(chatWrapperElement).render(
    <React.StrictMode>
        <App data={data} />
    </React.StrictMode>,
);
