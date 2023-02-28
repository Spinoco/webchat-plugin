import { ConfigurationInterface } from "../interfaces/configuration/configuration-interface";
import { config } from "../../config/config";

/**
 * Creates classes for chat box wrapper that are used to:
 * 1) styling the chat box wrapper
 * 2) adding custom features
 */
export const createChatBoxWrapperClasses = (configuration: ConfigurationInterface): string => {
    const classes: string[] = [];

    classes.push(config.classes.chatWrapper);

    if (configuration.features?.bubbleSingleBorder) {
        classes.push(config.classes.features.bubbleSingleBorder);
    }

    if (configuration.features?.scrollbar) {
        classes.push(config.classes.features.scrollbar);
    }

    if (configuration.features?.sendBoxInputBorder) {
        classes.push(config.classes.features.sendBoxInputBorder);
    }

    if (configuration.features?.boxShadow) {
        classes.push(config.classes.features.boxShadow);
    }

    return classes.join(" ");
};
