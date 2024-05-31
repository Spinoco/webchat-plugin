import React from "react";
import { Close, Send } from "./icons";
import { ConfigurationInterface } from "../models/interfaces/configuration/configuration-interface";
import { createPopoverHeadCssProperties } from "../models/styles/popover/create-popover-head-css-properties";
import { createPopoverCssProperties } from "../models/styles/popover/create-popover-css-properties";
import { createPopoverBodyCssProperties } from "../models/styles/popover/create-popover-body-css-properties";
import { createPopoverButtonCssProperties } from "../models/styles/popover/create-popover-button-css-properties";
import { createPopoverTitleCssProperties } from "../models/styles/popover/create-popover-title-css-properties";
import { config } from "../config/config";

interface PopoverProps {
    label: string;
    buttonLabel?: string;
    onClose?: () => void;
    onClick?: () => void;
    configuration: ConfigurationInterface;
}
export const Popover: React.FC<PopoverProps> = ({ label, buttonLabel, configuration, onClose, onClick }) => {
    const logoExists = configuration?.popover?.head?.logo;
    const logoSrc = logoExists?.base64 ?? logoExists?.url ?? config.styleProperties.popover.head.logo.base64;

    return (
        <div className="swp-popover" style={createPopoverCssProperties(configuration)}>
            {logoExists && (
                <div className="swp-popover-head" style={createPopoverHeadCssProperties(configuration)}>
                    <img src={logoSrc} alt="" />
                </div>
            )}
            <div className="close-btn" onClick={onClose}>
                <Close
                    color={
                        configuration.popover?.head?.closeBtnColor
                            ? configuration.popover.head.closeBtnColor
                            : config.styleProperties.popover.head.closeBtnColor
                    }
                />
            </div>
            <div className="swp-popover-body" style={createPopoverBodyCssProperties(configuration)}>
                <h3 style={createPopoverTitleCssProperties(configuration)}>{label}</h3>

                <button
                    onClick={onClick}
                    style={createPopoverButtonCssProperties(configuration)}
                    className={`inline-flex items-center justify-center px-4 py-2 leading-6 text-white rounded-full md:w-auto hover:bg-gray-800 ${
                        !buttonLabel && "full-width"
                    }`}
                >
                    <Send
                        color={
                            configuration.popover?.body?.button?.iconColor
                                ? configuration.popover?.body.button.iconColor
                                : config.styleProperties.popover.body.button.iconColor
                        }
                    />
                    {buttonLabel && <span className="sw-popover-button-label">{buttonLabel}</span>}
                </button>
            </div>
        </div>
    );
};
