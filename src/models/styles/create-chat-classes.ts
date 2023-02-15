import { ConfigurationInterface } from "../interfaces/configuration/configuration-interface";
import { config } from "../../config/config";

/**
 * Vytvoří třídy pro <ReactChat>, které slouží pro:
 * 1) přidání custom features
 * 2) pro nastylování okna chatu
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
