import { ConfigurationInterface } from "../../interfaces/configuration/configuration-interface";
import { CSSProperties } from "react";

/**
 * Creates styles for the popover element.
 */
export const createPopoverCssProperties = (configuration: ConfigurationInterface): CSSProperties => {
    const properties: CSSProperties = {};

    if (configuration.popover?.borderRadius) {
        properties.borderRadius = configuration.popover.borderRadius;
    }

    return properties;
};
