import { ConfigurationInterface } from "../../interfaces/configuration/configuration-interface";
import { CSSProperties } from "react";
import { config } from "../../../config/config";

/**
 * Creates styles for the popover head element.
 */
export const createPopoverHeadCssProperties = (configuration: ConfigurationInterface): CSSProperties => {
    const properties = {
        "--popover-head-logo-height": configuration.popover?.head?.logo?.height
            ? configuration.popover.head.logo.height
            : config.styleProperties.popover.head.logo.height
    } as CSSProperties;

    properties.backgroundColor = configuration.popover?.head?.backgroundColor
        ? configuration.popover.head.backgroundColor
        : config.styleProperties.popover.head.backgroundColor;

    properties.borderBottomColor = configuration.popover?.head?.borderColor
        ? configuration.popover.head.borderColor
        : config.styleProperties.popover.head.borderColor;

    properties.borderTopLeftRadius = configuration.popover?.borderRadius
        ? configuration.popover?.borderRadius
        : config.styleProperties.popover.borderRadius;

    properties.borderTopRightRadius = configuration.popover?.borderRadius
        ? configuration.popover?.borderRadius
        : config.styleProperties.popover.borderRadius;
    return properties;
};
