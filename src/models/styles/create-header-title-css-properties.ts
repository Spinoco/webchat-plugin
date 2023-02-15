import { ConfigurationInterface } from "../interfaces/configuration-interface";
import { CSSProperties } from "react";

export const createHeaderTitleCSSProperties = (configuration: ConfigurationInterface): CSSProperties => {
    const properties: CSSProperties = {};

    if (configuration.header?.titleColor) {
        properties.color = configuration.header.titleColor;
    }

    return properties;
};
