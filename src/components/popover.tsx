import React, { useEffect } from "react";
import { Close, Send } from "./icons";
import { ConfigurationInterface } from "../models/interfaces/configuration/configuration-interface";
import { createPopoverHeadCssProperties } from "../models/styles/popover/create-popover-head-css-properties";
import { createPopoverCssProperties } from "../models/styles/popover/create-popover-css-properties";
import { createPopoverBodyCssProperties } from "../models/styles/popover/create-popover-body-css-properties";
import { createPopoverButtonCssProperties } from "../models/styles/popover/create-popover-button-css-properties";
import { createPopoverDismissCssProperties } from "../models/styles/popover/create-popover-dismiss-css-properties";
import { createPopoverTitleCssProperties } from "../models/styles/popover/create-popover-title-css-properties";
import { config } from "../config/config";

const LABEL_ELEMENT_ID = "swp-popover-label";

interface PopoverProps {
    label: string;
    buttonLabel?: string;

    /**
     * Label of a second button that dismisses the popover, ie. when the label is a question the
     * user has to answer. Without it the popover is only dismissed by its close button.
     */
    dismissLabel?: string;

    /**
     * Displays the popover in the middle of the page over everything else, instead of in the
     * corner above the trigger. Used when the user has to answer before they can go on.
     */
    fullscreen?: boolean;

    onClose?: () => void;
    onClick?: () => void;
    configuration: ConfigurationInterface;
}
export const Popover: React.FC<PopoverProps> = ({
    label,
    buttonLabel,
    dismissLabel,
    fullscreen,
    configuration,
    onClose,
    onClick,
}) => {
    const logoExists = configuration?.popover?.head?.logo;
    const logoSrc = logoExists?.base64 ?? logoExists?.url ?? config.styleProperties.popover.head.logo.base64;
    useEffect(() => {
        if (!fullscreen) {
            return;
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && onClose) {
                onClose();
            }
        };

        window.addEventListener("keydown", onKeyDown);

        return () => window.removeEventListener("keydown", onKeyDown);
    }, [fullscreen]);

    const confirmButton = (
        <button
            onClick={onClick}
            style={createPopoverButtonCssProperties(configuration)}
            className={`inline-flex items-center justify-center px-4 py-2 leading-6 text-white rounded-full md:w-auto hover:bg-gray-800 ${
                !buttonLabel && "full-width"
            }`}
        >
            {/* the icon invites to write us, which is not what a question is answered with */}
            {!dismissLabel && (
                <Send
                    color={
                        configuration.popover?.body?.button?.iconColor
                            ? configuration.popover?.body.button.iconColor
                            : config.styleProperties.popover.body.button.iconColor
                    }
                />
            )}
            {buttonLabel && <span className="sw-popover-button-label">{buttonLabel}</span>}
        </button>
    );

    const popover = (
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
                <h3 id={LABEL_ELEMENT_ID} style={createPopoverTitleCssProperties(configuration)}>
                    {label}
                </h3>

                {dismissLabel ? (
                    <div className="swp-popover-actions">
                        <button
                            onClick={onClose}
                            style={createPopoverDismissCssProperties(configuration)}
                            className="swp-popover-dismiss"
                        >
                            {dismissLabel}
                        </button>

                        {confirmButton}
                    </div>
                ) : (
                    confirmButton
                )}
            </div>
        </div>
    );

    if (!fullscreen) {
        return popover;
    }

    return (
        <div className="swp-popover-backdrop" role="dialog" aria-modal="true" aria-labelledby={LABEL_ELEMENT_ID}>
            {popover}
        </div>
    );
};
