import { ConfigurationInterface } from "../../interfaces/configuration/configuration-interface";
import { CSSProperties } from "react";

/**
 * Creates styles for the button that dismisses the popover.
 *
 * It complements the button that confirms it, so it carries its color as a plain text button.
 */
export const createPopoverDismissCssProperties = (configuration: ConfigurationInterface): CSSProperties => {
    const properties: CSSProperties = {
        "--popover-button-border-radius": configuration.popover?.body?.button?.borderRadius
            ? configuration.popover.body.button.borderRadius
            : "999px",
    } as CSSProperties;

    properties.color = configuration.popover?.body?.button?.backgroundColor
        ? configuration.popover.body.button.backgroundColor
        : configuration.primaryColor;

    return properties;
};
