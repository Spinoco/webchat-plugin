import { ConfigurationInterface } from "../interfaces/configuration/configuration-interface";
import React, { CSSProperties } from "react";
import { styleOptionsConfig } from "../../config/style-options-config";
import { config } from "../../config/config";

/**
 * Creates CSS variables for the entire plugin.
 */
export const createWrapperCssVariables = (configuration: ConfigurationInterface): CSSProperties => {
    const properties = {
        "--color-primary": configuration.primaryColor,
        "--color-primary-hover": configuration.primaryColorHover
            ? configuration.primaryColorHover
            : configuration.primaryColor,
        "--border-color": configuration.borderColor ? configuration.borderColor : configuration.primaryColor,
        "--wrapper-border-radius": configuration.root?.borderRadius
            ? configuration.root.borderRadius + "px"
            : config.styleProperties.wrapper.borderRadius,
        "--typing-indicator-background": configuration.typingIndicator?.background
            ? configuration.typingIndicator.background
            : config.styleProperties.typingIndicator.background,
        "--typing-indicator-color": configuration.typingIndicator?.color
            ? configuration.typingIndicator.color
            : config.styleProperties.typingIndicator.color,
        "--avatar-size":
            (configuration.avatar?.size ? configuration.avatar.size : styleOptionsConfig.avatarSize) + "px",
        "--avatar-border-radius": configuration.avatar?.borderRadius
            ? configuration.avatar.borderRadius
            : styleOptionsConfig.avatarBorderRadius,
        "--avatar-background": configuration.avatar?.background
            ? configuration.avatar.background
            : configuration.primaryColor,
        "--avatar-font-size": configuration.avatar?.fontSize
            ? configuration.avatar.fontSize
            : config.styleProperties.avatar.fontSize,
    } as React.CSSProperties;

    if (configuration.root?.borderRadius) {
        properties.borderTopLeftRadius = configuration.root.borderRadius + "px";
        properties.borderTopRightRadius = configuration.root.borderRadius + "px";
    }

    return properties;
};
