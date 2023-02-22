import { ConfigurationInterface } from "../models/interfaces/configuration/configuration-interface";
import React from "react";
import { Close } from "./icons";
import { createHeaderCSSProperties } from "../models/styles/create-header-css-properties";
import { createHeaderTitleCSSProperties } from "../models/styles/create-header-title-css-properties";
import { config } from "../config/config";

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
            {configuration.header?.logo?.base64 && (
                <img src={configuration.header.logo.base64} className="swp-header-logo" alt={clientId} />
            )}
            {(configuration.header?.title?.hide === undefined || configuration.header?.title.hide === false) && (
                <div className="swp-header-title" style={createHeaderTitleCSSProperties(configuration)}>
                    {clientId}
                </div>
            )}
            {(configuration.header?.closeIcon?.hide === undefined ||
                configuration.header?.closeIcon?.hide === false) && (
                <div className="swp-header-close">
                    {configuration.header?.closeIcon?.base64 ? (
                        <img src={configuration.header.closeIcon.base64} alt={clientId} />
                    ) : (
                        <Close
                            color={
                                configuration.header?.closeIcon?.color
                                    ? configuration.header.closeIcon.color
                                    : config.styleProperties.header.closeIcon.color
                            }
                        />
                    )}
                </div>
            )}
        </div>
    );
};
