import { ConfigurationInterface } from "../../interfaces/configuration/configuration-interface";
import { CSSProperties } from "react";
import { config } from "../../../config/config";

/**
 * Creates styles for the popover body element.
 */
export const createPopoverBodyCssProperties = (configuration: ConfigurationInterface): CSSProperties => {
    const properties: CSSProperties = {};

    properties.backgroundColor = configuration.popover?.body?.backgroundColor
        ? configuration.popover.body.backgroundColor
        : config.styleProperties.popover.body.backgroundColor;

    properties.borderBottomLeftRadius = configuration.popover?.borderRadius
        ? configuration.popover?.borderRadius
        : config.styleProperties.popover.borderRadius;

    properties.borderBottomRightRadius = configuration.popover?.borderRadius
        ? configuration.popover?.borderRadius
        : config.styleProperties.popover.borderRadius;
    return properties;
};
