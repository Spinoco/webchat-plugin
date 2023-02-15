import { StyleOptions } from "botframework-webchat-api";
import { UserInterface } from "../interfaces/user-interface";
import { ConfigurationInterface } from "../interfaces/configuration-interface";
import { getInitials } from "../chat/get-initials";
import { styleOptionsConfig } from "../../config/style-options-config";
import { config } from "../../config/config";

/**
 * Vytvoří objekt pro nastylování chatu pomocí jeho interních vlastností.
 */
export const createStyleOptions = (c: ConfigurationInterface, user?: UserInterface): StyleOptions => {
    let styleOptions: StyleOptions = {
        accent: c.accent,
        subtle: c.subtle ? c.subtle : c.secondaryColor,
        rootZIndex: c.root && c.root.zIndex,
        bubbleBorderColor: c?.bubble?.border?.color ? c.bubble.border.color : c.primaryColor,
        bubbleFromUserBorderColor: c?.bubble?.border?.color ? c.bubble.border.color : c.primaryColor,
        sendBoxBackground: c.sendBox?.background,
        sendBoxTextColor: c.sendBox?.color,
        sendBoxButtonColor: c.sendBox?.button?.color ? c.sendBox.button.color : c.primaryColor,
        avatarSize: 20, // TODO avatar style
        userAvatarBackgroundColor: c.primaryColor, // TODO avatar style
        suggestedActionTextColor: c.suggestedAction?.textColor?.base
            ? c.suggestedAction.textColor.base
            : c.primaryColor,
        suggestedActionBorderColor: c.suggestedAction?.border?.color?.base
            ? c.suggestedAction?.border.color.base
            : c.primaryColor,
        suggestedActionBorderWidth: c.suggestedAction?.border?.width?.base,
        // bot avatar have to be defined in channelData
        // botAvatarImage: "/bot-avatar.jpg",
        // botAvatarInitials: "B",
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

    // SUGGESTED ACTION
    styleOptions = createSuggestedActionStyleOptions(c, styleOptions);

    // SEND BOX

    if (c.sendBox?.height) {
        styleOptions.sendBoxHeight = c.sendBox.height;
    }

    if (c.sendBox?.button?.shadeInset) {
        styleOptions.sendBoxButtonShadeInset = c.sendBox.button.shadeInset;
    }

    if (c.sendBox?.border?.top) {
        styleOptions.sendBoxBorderTop = c.sendBox.border.top;
    }

    // timestamp grouping https://microsoft.github.io/BotFramework-WebChat/05.custom-components/a.timestamp-grouping/?ts=default
    styleOptions.groupTimestamp = config.chat.groupTimestamp * 1000;

    // user avatar
    if (user) {
        styleOptions.userAvatarInitials = getInitials(user.name);
        if (user.avatarUrl) {
            styleOptions.userAvatarImage = user.avatarUrl;
        } else {
            // styleOptions.userAvatarImage = c.logoBase64; // REMOVE - TEST ONLY
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

    return styleOptions;
};
