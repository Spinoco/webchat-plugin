import { ConfigurationInterface } from "../interfaces/configuration-interface";
import { BUBBLE_SINGLE_BORDER, SCROLLBAR } from "../constants/style-feature-classes";

export const createStyleFeaturesClasses = (configuration: ConfigurationInterface): string => {
    const classes: string[] = [];

    if (configuration.features?.bubbleSingleBorder) {
        classes.push(BUBBLE_SINGLE_BORDER);
    }

    if (configuration.features?.scrollbar) {
        classes.push(SCROLLBAR);
    }

    return classes.join(" ");
};
