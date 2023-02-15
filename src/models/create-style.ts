import { ConfigurationInterface } from "../interfaces/configuration-interface";
import React from "react";

export const createStyle = (configuration: ConfigurationInterface): React.CSSProperties => {
    return {
        "--color-primary": configuration.primaryColor,
        "--color-primary-hover": configuration.primaryColorHover
            ? configuration.primaryColorHover
            : configuration.primaryColor,
        "--border-color": configuration.borderColor ? configuration.borderColor : configuration.primaryColor,
        "--trigger-icon-height": configuration.trigger?.iconHeight ? configuration.trigger.iconHeight : "24px",
        "--header-logo-height": configuration.header?.logoHeight ? configuration.header.logoHeight : "20px",
        "--header-close-height": configuration.header?.closeHeight ? configuration.header.closeHeight : "20px",
        "--wrapper-border-radius": configuration.root?.borderRadius ? configuration.root.borderRadius + "px" : "0px",
    } as React.CSSProperties;
};
