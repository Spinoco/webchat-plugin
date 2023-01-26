import React, { useMemo, useState } from "react";
import { ConfigurationInterface } from "./interfaces/configuration-interface";
import FullReactWebChat, { createDirectLine } from "botframework-webchat";
import { DirectLine } from "botframework-directlinejs";
// import StyleOptions from "botframework-webchat-api/src/StyleOptions";
// import reactLogo from './assets/react.svg'
// import './app.css'

interface AppProps {
    data: ConfigurationInterface;
}

// const styleOptions: StyleOptions = {};
// styleOptions={styleOptions}

export const App: React.FC<AppProps> = ({ data }) => {
    const [directLine, setDirectLine] = useState<DirectLine>();

    useMemo(async () => {
        const res = await fetch("https://webchat-mockbot.azurewebsites.net/directline/token", { method: "POST" });
        const { token } = await res.json();

        const dl = createDirectLine({ token });
        console.log(dl);
        setDirectLine(dl);
    }, []);

    return (
        <div className="window">
            <div>BgColor: {data.bgColor}</div>
            {directLine ? <FullReactWebChat directLine={directLine} /> : null}
        </div>
    );
};
