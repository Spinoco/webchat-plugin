import { ConfigurationInterface } from "../interfaces/configuration-interface";
import React, { CSSProperties } from "react";

/**
 * Vytváří proměnné pro celý plugin.
 */
export const createWrapperCssVariables = (configuration: ConfigurationInterface): CSSProperties => {
    return {
        "--color-primary": configuration.primaryColor,
        "--color-primary-hover": configuration.primaryColorHover
            ? configuration.primaryColorHover
            : configuration.primaryColor,
        "--border-color": configuration.borderColor ? configuration.borderColor : configuration.primaryColor,
        "--wrapper-border-radius": configuration.root?.borderRadius ? configuration.root.borderRadius + "px" : "0px",
        "--typing-indicator-background": configuration.typingIndicator?.background
            ? configuration.typingIndicator.background
            : "#F0F0F0",
        "--typing-indicator-color": configuration.typingIndicator?.color
            ? configuration.typingIndicator.color
            : "#999999",
    } as React.CSSProperties;
};
