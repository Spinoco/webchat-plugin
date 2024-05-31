import { ConfigurationInterface } from "../../interfaces/configuration/configuration-interface";
import { CSSProperties } from "react";

/**
 * Creates styles for the popover button element.
 */
export const createPopoverButtonCssProperties = (configuration: ConfigurationInterface): CSSProperties => {
    const properties: CSSProperties = {
        "--popover-button-hover-background-color": configuration.popover?.body?.button?.hoverBackgroundColor
            ? configuration.popover.body.button.hoverBackgroundColor
            : "#CCCCCC",
        "--popover-button-border-radius": configuration.popover?.body?.button?.borderRadius
            ? configuration.popover.body.button.borderRadius
            : "999px",
    } as CSSProperties;

    properties.backgroundColor = configuration.popover?.body?.button?.backgroundColor
        ? configuration.popover.body.button.backgroundColor
        : configuration.primaryColor;

    properties.color = configuration.popover?.body?.button?.color ? configuration.popover.body.button.color : "#ffffff";

    return properties;
};
