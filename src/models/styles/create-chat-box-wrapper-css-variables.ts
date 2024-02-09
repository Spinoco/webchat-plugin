import { ConfigurationInterface } from "../interfaces/configuration/configuration-interface";
import { CSSProperties } from "react";
import { config } from "../../config/config";

/**
 * Creates styles for the wrapper above the chat window. It is used for show or hide chat.
 */
export const createChatBoxWrapperCssVariables = (
    isVisible: boolean,
    configuration: ConfigurationInterface,
): CSSProperties => {
    let chatBoxWrapperStyles = {
        "--suggested-action-border-color": configuration.suggestedAction?.border?.color
            ? configuration.suggestedAction.border.color
            : configuration.primaryColor,
        "--suggested-action-border-style": configuration.suggestedAction?.border?.style
            ? configuration.suggestedAction.border.style
            : config.styleProperties.suggestedAction.border.style,
        "--suggested-action-border-width": configuration.suggestedAction?.border?.width
            ? configuration.suggestedAction.border.width + "px"
            : config.styleProperties.suggestedAction.border.width,
        "--suggested-action-border-radius": configuration.suggestedAction?.border?.radius
            ? configuration.suggestedAction.border.radius + "px"
            : config.styleProperties.suggestedAction.border.radius,
        "--link-color": configuration.linkColor ? configuration.linkColor : config.styleProperties.linkColor,
    } as CSSProperties;

    if (!isVisible) {
        chatBoxWrapperStyles = {
            visibility: "hidden",
            width: 0,
            height: 0,
        };
    }

    if (configuration.root?.borderRadius) {
        chatBoxWrapperStyles.borderTopLeftRadius = configuration.root.borderRadius + "px";
        chatBoxWrapperStyles.borderTopRightRadius = configuration.root.borderRadius + "px";
    }

    return chatBoxWrapperStyles;
};
