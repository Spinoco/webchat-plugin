import { ConfigurationInterface } from "../interfaces/configuration-interface";
import { CSSProperties } from "react";

export const createHeaderCSSProperties = (configuration: ConfigurationInterface): CSSProperties => {
    const properties: CSSProperties = {};

    properties.backgroundColor = configuration.primaryColor;

    if (configuration.header && configuration.header.padding) {
        properties.padding = configuration.header.padding;
    }

    return properties;
};
