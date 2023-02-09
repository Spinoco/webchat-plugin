import { ConfigurationInterface } from "../interfaces/configuration-interface";

export const createStyleFeaturesClasses = (configuration: ConfigurationInterface): string => {
    const classes: string[] = [];

    if (configuration.bubble?.border?.oneBorderOnly) {
        classes.push("bubble-single-border");
    }

    return classes.join(" ");
};
