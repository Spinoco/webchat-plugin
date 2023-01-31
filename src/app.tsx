import React, { useMemo, useState } from "react";
import { ConfigurationInterface } from "./interfaces/configuration-interface";
import ReactWebChat, { createDirectLine } from 'botframework-webchat';
import { DirectLine } from "botframework-directlinejs";
import { StyleOptions } from "botframework-webchat-api";
// import reactLogo from './assets/react.svg'
// import './app.css'

interface AppProps {
    data: ConfigurationInterface;
}

const styleOptions: StyleOptions = {
    sendBoxBackground: 'red',
    bubbleBorderColor: '#ff0000'
};

export const App: React.FC<AppProps> = ({ data }) => {
    const [directLine, setDirectLine] = useState<DirectLine>();

    useMemo(async () => {
        const res = await fetch("https://webchat-mockbot.azurewebsites.net/directline/token", { method: "POST" });
        const { token } = await res.json();
        setDirectLine(createDirectLine({ token }));
    }, []);

    return (
        <div className="window">
            <div>COLOR: {data.bgColor}</div>
            {directLine ? <ReactWebChat styleOptions={styleOptions} directLine={directLine} /> : "NO DL"}
        </div>
    );
};
