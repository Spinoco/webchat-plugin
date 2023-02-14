import { ConfigurationInterface } from "../interfaces/configuration-interface";
import { bubbleSingleBorder, scrollbar, sendBoxInputBorder } from "../constants/style-feature-classes";

export const createStyleFeaturesClasses = (configuration: ConfigurationInterface): string => {
    const classes: string[] = [];

    classes.push("swp-chat-wrapper");

    if (configuration.features?.bubbleSingleBorder) {
        classes.push(bubbleSingleBorder);
    }

    if (configuration.features?.scrollbar) {
        classes.push(scrollbar);
    }

    if (configuration.features?.sendBoxInputBorder) {
        classes.push(sendBoxInputBorder);
    }

    return classes.join(" ");
};
