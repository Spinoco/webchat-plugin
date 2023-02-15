import { ConfigurationInterface } from "../interfaces/configuration-interface";
import { CSSProperties } from "react";

/**
 * Vytvoří styly pro element na otevření chatu.
 */
export const createTriggerCSSProperties = (configuration: ConfigurationInterface): CSSProperties => {
    const properties = {
        "--trigger-icon-height": configuration.trigger?.iconHeight ? configuration.trigger.iconHeight : "24px",
    } as CSSProperties;

    if (configuration.trigger?.height) {
        properties.height = configuration.trigger.height;
    }

    if (configuration.trigger?.width) {
        properties.width = configuration.trigger.width;
    }

    if (configuration.trigger?.zIndex) {
        properties.zIndex = configuration.trigger.zIndex;
    }

    properties.backgroundColor = configuration.trigger?.background
        ? configuration.trigger.background
        : configuration.primaryColor;

    if (configuration.trigger?.border) {
        properties.border = configuration.trigger.border;
    }

    if (configuration.trigger?.borderRadius) {
        properties.borderRadius = configuration.trigger.borderRadius;
    }

    return properties;
};
