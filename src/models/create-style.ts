import { ConfigurationInterface } from "../interfaces/configuration-interface";
import React from "react";

export const createStyle = (configuration: ConfigurationInterface): React.CSSProperties => {
    return {
        "--color-primary": configuration.primaryColor,
        "--color-primary-hover": configuration.primaryColorHover
            ? configuration.primaryColorHover
            : configuration.primaryColor,
    } as React.CSSProperties;
};
