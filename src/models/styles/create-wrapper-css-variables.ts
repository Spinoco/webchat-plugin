import { ConfigurationInterface } from "../interfaces/configuration/configuration-interface";
import React, { CSSProperties } from "react";
import { styleOptionsConfig } from "../../config/style-options-config";
import { config } from "../../config/config";

/**
 * Creates CSS variables for the entire plugin.
 */
export const createWrapperCssVariables = (configuration: ConfigurationInterface): CSSProperties => {
    const properties: Record<string, string | number | undefined> = {
        "--zIndex": configuration.root?.zIndex ? configuration.root.zIndex : 2,
        "--swp-color-primary": configuration.primaryColor,
        "--swp-color-secondary": configuration.secondaryColor,
        "--swp-color-primary-hover": configuration.primaryColorHover
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
        "--send-box-margin": configuration.sendBox?.margin,
        "--send-box-upload-width": configuration.sendBox?.upload?.width
            ? configuration.sendBox.upload.width
            : configuration.sendBox?.height
              ? configuration.sendBox.height + "px"
              : "40px",
        "--send-box-upload-height": configuration.sendBox?.upload?.height
            ? configuration.sendBox.upload.height
            : "auto",
        "--send-box-upload-border-radius": configuration.sendBox?.upload?.borderRadius,
        "--send-box-upload-align-self": configuration.sendBox?.upload?.height ? "center" : "stretch",
        "--send-box-upload-backgroundColor": configuration.sendBox?.upload?.backgroundColor,
        "--send-box-upload-color": configuration.sendBox?.upload?.color,
        "--send-box-upload-hoverBackgroundColor": configuration.sendBox?.upload?.hoverBackgroundColor
            ? configuration.sendBox.upload.hoverBackgroundColor
            : configuration.sendBox?.button?.shadeColorOnHover ??
              config.styleProperties.sendBox.button.shadeColorOnHover,
        "--send-box-send-width": configuration.sendBox?.send?.width
            ? configuration.sendBox.send.width
            : configuration.sendBox?.height
              ? configuration.sendBox.height + "px"
              : "40px",
        "--send-box-send-height": configuration.sendBox?.send?.height ? configuration.sendBox.send.height : "auto",
        "--send-box-send-border-radius": configuration.sendBox?.send?.borderRadius,
        "--send-box-send-align-self": configuration.sendBox?.send?.height ? "center" : "stretch",
        "--send-box-send-backgroundColor": configuration.sendBox?.send?.backgroundColor,
        "--send-box-send-color": configuration.sendBox?.send?.color,
        "--send-box-send-hoverBackgroundColor": configuration.sendBox?.send?.hoverBackgroundColor
            ? configuration.sendBox.send.hoverBackgroundColor
            : configuration.sendBox?.button?.shadeColorOnHover ??
              config.styleProperties.sendBox.button.shadeColorOnHover,
    };

    if (configuration.variables) {
        for (const variable in configuration.variables) {
            properties[`--swp-${variable}`] = configuration.variables[variable];
        }
    }

    return properties as React.CSSProperties;
};
