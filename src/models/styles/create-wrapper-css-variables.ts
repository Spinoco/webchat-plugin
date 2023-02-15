import { ConfigurationInterface } from "../interfaces/configuration/configuration-interface";
import React, { CSSProperties } from "react";
import { styleOptionsConfig } from "../../config/style-options-config";

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
        "--avatar-size":
            (configuration.avatar?.size ? configuration.avatar.size : styleOptionsConfig.avatarSize) + "px",
        "--avatar-border-radius": configuration.avatar?.borderRadius
            ? configuration.avatar.borderRadius
            : styleOptionsConfig.avatarBorderRadius,
        "--avatar-background": configuration.avatar?.background
            ? configuration.avatar.background
            : configuration.primaryColor,
        "--avatar-font-size": configuration.avatar?.fontSize ? configuration.avatar.fontSize : "12px",
    } as React.CSSProperties;
};
