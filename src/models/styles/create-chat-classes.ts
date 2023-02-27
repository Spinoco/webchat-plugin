import { ConfigurationInterface } from "../interfaces/configuration/configuration-interface";
import { config } from "../../config/config";

/**
 * Creates classes for <ReactWebChat> that are used to:
 * 1) styling the chat window
 * 2) adding custom features
 */
export const createChatClasses = (configuration: ConfigurationInterface): string => {
    const classes: string[] = [];

    classes.push(config.classes.chat);

    if (configuration.features?.bubbleSingleBorder) {
        classes.push(config.classes.features.bubbleSingleBorder);
    }

    if (configuration.features?.scrollbar) {
        classes.push(config.classes.features.scrollbar);
    }

    if (configuration.features?.sendBoxInputBorder) {
        classes.push(config.classes.features.sendBoxInputBorder);
    }

    return classes.join(" ");
};
