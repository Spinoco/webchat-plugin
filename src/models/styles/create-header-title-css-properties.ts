import { ConfigurationInterface } from "../interfaces/configuration/configuration-interface";
import { CSSProperties } from "react";

/**
 * Metoda slouží pro nastylování nadpisu hlavičky chatu.
 */
export const createHeaderTitleCSSProperties = (configuration: ConfigurationInterface): CSSProperties => {
    const properties: CSSProperties = {};

    if (configuration.header?.title?.color) {
        properties.color = configuration.header.title.color;
    }

    return properties;
};
