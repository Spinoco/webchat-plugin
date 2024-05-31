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

    if (configuration.header?.title?.fontSize) {
        properties.fontSize = configuration.header.title.fontSize;
    }

    if (configuration.header?.title?.fontWeight) {
        properties.fontWeight = configuration.header.title.fontWeight;
    }

    return properties;
};
