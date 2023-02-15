import { ConfigurationInterface } from "../interfaces/configuration-interface";
import { config } from "../config/config";

export const createStyleFeaturesClasses = (configuration: ConfigurationInterface): string => {
    const classes: string[] = [];

    classes.push("swp-chat-wrapper");

    if (configuration.features?.bubbleSingleBorder) {
        classes.push(config.classes.bubbleSingleBorder);
    }

    if (configuration.features?.scrollbar) {
        classes.push(config.classes.scrollbar);
    }

    if (configuration.features?.sendBoxInputBorder) {
        classes.push(config.classes.sendBoxInputBorder);
    }

    return classes.join(" ");
};
