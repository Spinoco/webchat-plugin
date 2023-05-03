import { ConfigurationInterface } from "../interfaces/configuration/configuration-interface";
import { CSSProperties } from "react";
import { config } from "../../config/config";

/**
 * Creates styles for the header title element.
 */
export const createChatBoxLoaderProperties = (configuration: ConfigurationInterface): CSSProperties => {
    const properties: CSSProperties = {};
    const addBorderStyle = " transparent transparent transparent";

    properties.borderColor = configuration.loader?.color
        ? configuration.loader.color + addBorderStyle
        : config.styleProperties.loader.color + addBorderStyle;

    return properties;
};
