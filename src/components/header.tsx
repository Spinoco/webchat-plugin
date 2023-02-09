import { ConfigurationInterface } from "../interfaces/configuration-interface";
import React from "react";
import { createHeaderCSSProperties } from "../models/create-header-style";

interface HeaderProps {
    clientId: string;
    configuration: ConfigurationInterface;
    setOpened: (e: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ clientId, configuration, setOpened }) => {
    return (
        <div
            className="swp-header"
            style={createHeaderCSSProperties(configuration)}
            onClick={() => {
                setOpened(false);
            }}
        >
            {configuration.logoBase64 && <img src={configuration.logoBase64} alt={clientId} />}
            {configuration.header?.showTitle && <div className="swp-header-title">{clientId}</div>}
            <div className="swp-header-close">&times;</div>
        </div>
    );
};
