import { ConfigurationInterface } from "../interfaces/configuration/configuration-interface";
import { CSSProperties } from "react";

/**
 * Metoda slouží pro nastylování hlavičky chatu.
 */
export const createHeaderCSSProperties = (configuration: ConfigurationInterface): CSSProperties => {
    const properties = {
        "--header-logo-height": configuration.header?.logoHeight ? configuration.header.logoHeight : "20px",
        "--header-close-height": configuration.header?.closeHeight ? configuration.header.closeHeight : "20px",
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
