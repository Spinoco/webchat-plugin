import { StyleOptions } from "botframework-webchat-api";
import { ConfigurationInterface } from "../interfaces/configuration/configuration-interface";
import { styleOptionsConfig } from "../../config/style-options-config";
import { config } from "../../config/config";

/**
 * Creates an object to style the chat using its internal properties.
 */
export const createStyleOptions = (c: ConfigurationInterface): StyleOptions => {
    let styleOptions: StyleOptions = {
        accent: c.primaryColor,
        subtle: c.subtle ? c.subtle : c.secondaryColor,
        rootZIndex: c.root?.zIndex && c.root.zIndex,
        botAvatarInitials: config.chat.botAvatarInitials, // enables bot avatar
        suggestedActionTextColor: c.suggestedAction?.textColor ? c.suggestedAction.textColor : c.primaryColor,
        suggestedActionTextColorOnHover: c.suggestedAction?.textColorOnHover
            ? c.suggestedAction.textColorOnHover
            : c.primaryColor,
        suggestedActionBorderColor: c.suggestedAction?.border?.color ? c.suggestedAction?.border.color : c.primaryColor,
        transcriptOverlayButtonBackground: c.primaryColor,
        sendBoxButtonColor: c.sendBox?.button?.color ? c.sendBox.button.color : c.primaryColor,
        sendBoxButtonColorOnHover:
            c.sendBox?.button?.colorOnHover ?? (c.sendBox?.button?.color ? c.sendBox.button.color : c.primaryColor),
        sendBoxButtonShadeColor: c.sendBox?.button?.shadeColor ?? config.styleProperties.sendBox.button.shadeColor,
        sendBoxButtonShadeColorOnHover:
            c.sendBox?.button?.shadeColorOnHover ?? config.styleProperties.sendBox.button.shadeColorOnHover,
    };

    // ROOT
    if (c.root?.width !== undefined) {
        styleOptions.rootWidth = c.root.width;
    }

    if (c.root?.height !== undefined) {
        styleOptions.rootHeight = c.root.height;
    }

    if (c.root?.background !== undefined) {
        styleOptions.backgroundColor = c.root.background;
    }

    if (c.markdownExternalLinkIconImage !== undefined) {
        styleOptions.markdownExternalLinkIconImage = c.markdownExternalLinkIconImage;
    }

    if (c.timestampColor !== undefined) {
        styleOptions.timestampColor = c.timestampColor;
    }

    if (c.primaryFont !== undefined) {
        styleOptions.primaryFont = c.primaryFont;
    }

    // BUBBLE
    styleOptions = createBubbleStyleOptions(c, styleOptions);

    // AVATAR
    styleOptions = createAvatarStyleOptions(c, styleOptions);

    // SUGGESTED ACTION
    styleOptions = createSuggestedActionStyleOptions(c, styleOptions);

    // SEND BOX
    styleOptions = createSendBoxStyleOptions(c, styleOptions);

    // timestamp grouping https://microsoft.github.io/BotFramework-WebChat/05.custom-components/a.timestamp-grouping/?ts=default
    styleOptions.groupTimestamp = config.chat.groupTimestamp * 1000;

    // Controls when the new messages button should show.
    styleOptions.scrollToEndButtonBehavior = false;

    //todo: do we want/need this? (, customer?: CustomerDto)
    // customer avatar
    //     if (customer) {
    //         styleOptions.userAvatarInitials = customer.initials;
    //     }

    return { ...styleOptionsConfig, ...styleOptions };
};

/**
 * Sets style properties for bubble component.
 */
const createBubbleStyleOptions = (c: ConfigurationInterface, styleOptions: StyleOptions): StyleOptions => {
    if (c.bubbleFromUser?.background !== undefined) {
        styleOptions.bubbleFromUserBackground = c.bubbleFromUser.background;

        if (c.bubble?.background !== undefined) {
            styleOptions.bubbleBackground = c.bubble.background;
        }
    } else if (c.bubble?.background !== undefined) {
        styleOptions.bubbleBackground = c.bubble.background;
        styleOptions.bubbleFromUserBackground = c.bubble.background;
    } else {
        styleOptions.bubbleFromUserBackground = c.primaryColor;
    }

    if (c.bubbleFromUser?.color !== undefined) {
        styleOptions.bubbleFromUserTextColor = c.bubbleFromUser.color;

        if (c.bubble?.color !== undefined) {
            styleOptions.bubbleTextColor = c.bubble.color;
        }
    } else if (c.bubble?.color !== undefined) {
        styleOptions.bubbleTextColor = c.bubble.color;
        styleOptions.bubbleFromUserTextColor = c.bubble.color;
    }

    if (c.bubbleFromUser?.border?.color !== undefined) {
        styleOptions.bubbleFromUserBorderColor = c.bubbleFromUser.border.color;

        if (c.bubble?.border?.color !== undefined) {
            styleOptions.bubbleBorderColor = c.bubble.border.color;
        } else {
            styleOptions.bubbleBorderColor = c.primaryColor;
        }
    } else if (c.bubble?.border?.color !== undefined) {
        styleOptions.bubbleBorderColor = c.bubble.border.color;
        styleOptions.bubbleFromUserBorderColor = c.bubble.border.color;
    } else {
        styleOptions.bubbleBorderColor = c.primaryColor;
        styleOptions.bubbleFromUserBorderColor = c.primaryColor;
    }

    if (c.bubbleFromUser?.border?.width !== undefined) {
        styleOptions.bubbleFromUserBorderWidth = c.bubbleFromUser.border.width;

        if (c.bubble?.border?.width !== undefined) {
            styleOptions.bubbleBorderWidth = c.bubble.border.width;
        }
    } else if (c.bubble?.border?.width !== undefined) {
        styleOptions.bubbleBorderWidth = c.bubble.border.width;
        styleOptions.bubbleFromUserBorderWidth = c.bubble.border.width;
    }

    if (c.bubbleFromUser?.border?.radius !== undefined) {
        styleOptions.bubbleFromUserBorderRadius = c.bubbleFromUser.border.radius;

        if (c.bubble?.border?.radius !== undefined) {
            styleOptions.bubbleBorderRadius = c.bubble.border.radius;
        }
    } else if (c.bubble?.border?.radius !== undefined) {
        styleOptions.bubbleBorderRadius = c.bubble.border.radius;
        styleOptions.bubbleFromUserBorderRadius = c.bubble.border.radius;
    }

    if (c.bubbleFromUser?.border?.style !== undefined) {
        styleOptions.bubbleFromUserBorderStyle = c.bubbleFromUser.border.style;

        if (c.bubble?.border?.style !== undefined) {
            styleOptions.bubbleBorderStyle = c.bubble.border.style;
        }
    } else if (c.bubble?.border?.style !== undefined) {
        styleOptions.bubbleBorderStyle = c.bubble.border.style;
        styleOptions.bubbleFromUserBorderStyle = c.bubble.border.style;
    }

    return styleOptions;
};

/**
 * Sets style properties for avatar component.
 */
const createAvatarStyleOptions = (c: ConfigurationInterface, styleOptions: StyleOptions): StyleOptions => {
    if (c.avatar?.size !== undefined) {
        styleOptions.avatarSize = c.avatar.size;
    }

    if (c.avatar?.borderRadius !== undefined) {
        styleOptions.avatarBorderRadius = c.avatar.borderRadius;
    }

    if (c.avatar?.background !== undefined) {
        styleOptions.userAvatarBackgroundColor = c.avatar.background;
        styleOptions.botAvatarBackgroundColor = c.avatar.background;
    } else {
        styleOptions.userAvatarBackgroundColor = c.primaryColor;
        styleOptions.botAvatarBackgroundColor = c.primaryColor;
    }

    return styleOptions;
};

/**
 * Sets style properties for suggested action component.
 */
const createSuggestedActionStyleOptions = (c: ConfigurationInterface, styleOptions: StyleOptions): StyleOptions => {
    if (c.suggestedAction?.layout !== undefined) {
        styleOptions.suggestedActionLayout = c.suggestedAction.layout;
    }

    if (c.suggestedAction?.imageHeight !== undefined) {
        styleOptions.suggestedActionImageHeight = c.suggestedAction.imageHeight;
    }

    if (c.suggestedAction?.height !== undefined) {
        styleOptions.suggestedActionHeight = c.suggestedAction.height;
    }

    if (c.suggestedAction?.background !== undefined) {
        styleOptions.suggestedActionBackgroundColor = c.suggestedAction.background;
    }

    if (c.suggestedAction?.backgroundOnHover !== undefined) {
        styleOptions.suggestedActionBackgroundColorOnHover = c.suggestedAction.backgroundOnHover;
    }

    if (c.suggestedAction?.border?.radius !== undefined) {
        styleOptions.suggestedActionBorderRadius = c.suggestedAction.border.radius;
    }

    if (c.suggestedAction?.border?.style !== undefined) {
        styleOptions.suggestedActionBorderStyle = c.suggestedAction.border.style;
    }

    if (c.suggestedAction?.border?.width !== undefined) {
        styleOptions.suggestedActionBorderWidth = c.suggestedAction.border.width;
    }

    return styleOptions;
};

/**
 * Sets style properties for send box component.
 */
const createSendBoxStyleOptions = (c: ConfigurationInterface, styleOptions: StyleOptions): StyleOptions => {
    if (c.sendBox?.background) {
        styleOptions.sendBoxBackground = c.sendBox.background;
    }

    if (c.sendBox?.color) {
        styleOptions.sendBoxTextColor = c.sendBox.color;
    }

    if (c.sendBox?.textWrap) {
        styleOptions.sendBoxTextWrap = c.sendBox.textWrap;
    }

    if (c.sendBox?.height) {
        styleOptions.sendBoxHeight = c.sendBox.height;
    }

    if (c.sendBox?.button?.shadeInset) {
        styleOptions.sendBoxButtonShadeInset = c.sendBox.button.shadeInset;
    }

    if (c.sendBox?.border?.top) {
        styleOptions.sendBoxBorderTop = c.sendBox.border.top;
    }

    if (c.sendBox?.border?.right) {
        styleOptions.sendBoxBorderRight = c.sendBox.border.right;
    }

    if (c.sendBox?.border?.bottom) {
        styleOptions.sendBoxBorderBottom = c.sendBox.border.bottom;
    }

    if (c.sendBox?.border?.left) {
        styleOptions.sendBoxBorderLeft = c.sendBox.border.left;
    }

    return styleOptions;
};
