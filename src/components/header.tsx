import { ConfigurationInterface } from "../interfaces/configuration-interface";
import React from "react";
import { createHeaderCSSProperties, createHeaderTitleCSSProperties } from "../models/create-header-style";
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
            {configuration.header?.logoBase64 && (
                <img src={configuration.header.logoBase64} className="swp-header-logo" alt={clientId} />
            )}
            {(configuration.header?.hideTitle === undefined || configuration.header?.hideTitle === false) && (
                <div className="swp-header-title" style={createHeaderTitleCSSProperties(configuration)}>
                    {clientId}
                </div>
            )}
            {(configuration.header?.hideClose === undefined || configuration.header?.hideClose === false) && (
                <div className="swp-header-close">
                    {configuration.header?.closeBase64 ? (
                        <img src={configuration.header.closeBase64} alt={clientId} />
                    ) : (
                        <Close
                            color={configuration.header?.closeIconColor ? configuration.header.closeIconColor : "white"}
                        />
                    )}
                </div>
            )}
        </div>
    );
};
