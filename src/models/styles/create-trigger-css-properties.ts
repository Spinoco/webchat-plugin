import { ConfigurationInterface } from "../interfaces/configuration/configuration-interface";
import { CSSProperties } from "react";
import { config } from "../../config/config";
import { rem } from "./util";

/**
 * Creates styles for the chat opening element.
 *
 * see trigger.scss
 */
export const createTriggerCSSProperties = (configuration: ConfigurationInterface): CSSProperties => {
    const properties = {
        "--trigger-icon-height": configuration.trigger?.icon?.height ?? config.styleProperties.trigger.icon.height,
        "--trigger-icon-color": configuration.trigger?.icon?.color ?? "white",
        height: configuration.trigger?.height ?? rem(50),
        width: configuration.trigger?.width ?? rem(50),
        backgroundColor: configuration.trigger?.background ?? configuration.primaryColor,
        borderRadius: configuration.trigger?.borderRadius ?? "100%",
    } as CSSProperties;

    if (configuration.trigger?.zIndex) {
        properties.zIndex = configuration.trigger.zIndex;
    }

    if (configuration.trigger?.border) {
        properties.border = configuration.trigger.border;
    }

    if (configuration.trigger?.borderRadius) {
        properties.borderRadius = configuration.trigger.borderRadius;
    }

    return properties;
};
