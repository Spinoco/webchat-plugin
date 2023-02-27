import { ConfigurationInterface } from "../interfaces/configuration/configuration-interface";
import { CSSProperties } from "react";

/**
 * Creates styles for the header title element.
 */
export const createHeaderTitleCSSProperties = (configuration: ConfigurationInterface): CSSProperties => {
    const properties: CSSProperties = {};

    if (configuration.header?.title?.color) {
        properties.color = configuration.header.title.color;
    }

    return properties;
};
