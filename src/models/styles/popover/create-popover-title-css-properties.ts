import { ConfigurationInterface } from "../../interfaces/configuration/configuration-interface";
import { CSSProperties } from "react";

/**
 * Creates styles for the popover title element.
 */
export const createPopoverTitleCssProperties = (configuration: ConfigurationInterface): CSSProperties => {
    const properties: CSSProperties = {};

    if (configuration.popover?.body?.titleColor) {
        properties.color = configuration.popover.body.titleColor;
    }

    return properties;
};
