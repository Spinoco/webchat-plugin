import { StyleOptions } from "botframework-webchat-api";
import { ConfigurationInterface } from "../interfaces/configuration/configuration-interface";
import { styleOptionsConfig } from "../../config/style-options-config";
import { config } from "../../config/config";
import { UserDto } from "../dtos/user-dto";

/**
 * Vytvoří objekt pro nastylování chatu pomocí jeho interních vlastností.
 */
export const createStyleOptions = (c: ConfigurationInterface, user?: UserDto): StyleOptions => {
    let styleOptions: StyleOptions = {
        accent: c.accent,
        subtle: c.subtle ? c.subtle : c.secondaryColor,
        rootZIndex: c.root && c.root.zIndex,
        bubbleBorderColor: c?.bubble?.border?.color ? c.bubble.border.color : c.primaryColor,
        bubbleFromUserBorderColor: c?.bubble?.border?.color ? c.bubble.border.color : c.primaryColor,
        botAvatarInitials: config.chat.botAvatarInitials, // enables bot avatar
        suggestedActionTextColor: c.suggestedAction?.textColor?.base
            ? c.suggestedAction.textColor.base
            : c.primaryColor,
        suggestedActionBorderColor: c.suggestedAction?.border?.color?.base
            ? c.suggestedAction?.border.color.base
            : c.primaryColor,
        suggestedActionBorderWidth: c.suggestedAction?.border?.width?.base,
        transcriptOverlayButtonBackground: c.primaryColor,
        sendBoxBackground: c.sendBox?.background,
        sendBoxTextColor: c.sendBox?.color,
        sendBoxButtonColor: c.sendBox?.button?.color ? c.sendBox.button.color : c.primaryColor,
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

    // user avatar
    if (user) {
        styleOptions.userAvatarInitials = user.initials;
        if (user.avatarUrl) {
            styleOptions.userAvatarImage = user.avatarUrl;
        }
    }

    return { ...styleOptionsConfig, ...styleOptions };
};

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

    if (c.suggestedAction?.background?.base !== undefined) {
        styleOptions.suggestedActionBackgroundColor = c.suggestedAction.background.base;
    }

    if (c.suggestedAction?.border?.radius !== undefined) {
        styleOptions.suggestedActionBorderRadius = c.suggestedAction.border.radius;
    }

    if (c.suggestedAction?.border?.style?.base !== undefined) {
        styleOptions.suggestedActionBorderStyle = c.suggestedAction.border.style.base;
    }

    return styleOptions;
};

const createSendBoxStyleOptions = (c: ConfigurationInterface, styleOptions: StyleOptions): StyleOptions => {
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
