import { ConfigurationInterface } from "../interfaces/configuration/configuration-interface";
import { CSSProperties } from "react";
import { config } from "../../config/config";

/**
 * Metoda slouží pro nastylování hlavičky chatu.
 */
export const createHeaderCSSProperties = (configuration: ConfigurationInterface): CSSProperties => {
    const properties = {
        "--header-logo-height": configuration.header?.logo?.height
            ? configuration.header.logo.height
            : config.styleProperties.header.logo.height,
        "--header-close-height": configuration.header?.closeIcon?.height
            ? configuration.header.closeIcon.height
            : config.styleProperties.header.closeIcon.height,
    } as CSSProperties;

    properties.backgroundColor = configuration.header?.backgroundColor
        ? configuration.header.backgroundColor
        : configuration.primaryColor;

    if (configuration.header && configuration.header.padding) {
        properties.padding = configuration.header.padding;
    }

    if (configuration.root?.borderRadius) {
        properties.borderTopLeftRadius = configuration.root.borderRadius + "px";
        properties.borderTopRightRadius = configuration.root.borderRadius + "px";
    }

    return properties;
};
