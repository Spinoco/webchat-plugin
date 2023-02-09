import { ConfigurationInterface } from "../interfaces/configuration-interface";
import React from "react";
import { createHeaderCSSProperties } from "../models/create-header-style";
import { Close } from "./icons";

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
            {configuration.header?.close && (
                <div className="swp-header-close">
                    {configuration.header?.closeBase64 ? (
                        <img src={configuration.header.closeBase64} alt={clientId} />
                    ) : (
                        <Close />
                    )}
                </div>
            )}
        </div>
    );
};
