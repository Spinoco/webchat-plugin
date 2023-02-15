import { ConfigurationInterface } from "../interfaces/configuration-interface";
import { CSSProperties } from "react";

export const createTriggerCSSProperties = (configuration: ConfigurationInterface): CSSProperties => {
    const properties: CSSProperties = {};

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
