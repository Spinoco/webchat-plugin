import { ConfigurationInterface } from "../interfaces/configuration-interface";
import { CSSProperties } from "react";

export const createHeaderCSSProperties = (configuration: ConfigurationInterface): CSSProperties => {
    const properties: CSSProperties = {};

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

export const createHeaderTitleCSSProperties = (configuration: ConfigurationInterface): CSSProperties => {
    const properties: CSSProperties = {};

    if (configuration.header?.titleColor) {
        properties.color = configuration.header.titleColor;
    }

    return properties;
};
