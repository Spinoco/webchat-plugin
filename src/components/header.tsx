import { ConfigurationInterface } from "../interfaces/configuration-interface";
import React from "react";
import { createHeaderCSSProperties } from "../models/create-header-style";
import { getBase64Prefix } from "../utils/get-base64-prefix";

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
            {configuration.logo && <img src={getBase64Prefix(configuration.logo)} alt={clientId} />}
            <div className="swp-header-title">{clientId}</div>
            <div className="swp-header-close">&times;</div>
        </div>
    );
};
