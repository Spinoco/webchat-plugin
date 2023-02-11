import { StyleOptions } from "botframework-webchat-api";
import { UserInterface } from "../interfaces/user-interface";
import { ConfigurationInterface } from "../interfaces/configuration-interface";
import { getInitials } from "../utils/get-initials";
import {
    SUGGESTED_ACTION_IMAGE_HEIGHT,
    HEIGHT,
    SUGGESTED_ACTION_LAYOUT,
    WIDTH,
} from "../constants/default-configuration";

export const createStyleOptions = (c: ConfigurationInterface, user?: UserInterface): StyleOptions => {
    const styleOptions: StyleOptions = {
        accent: c.accent,
        subtle: c.subtle ? c.subtle : c.secondaryColor,
        rootHeight: c.root && c.root.height ? c.root.height : HEIGHT,
        rootWidth: c.root && c.root.width ? c.root.width : WIDTH,
        rootZIndex: c.root && c.root.zIndex,
        bubbleBorderWidth: c?.bubble?.border?.width,
        bubbleBorderColor: c?.bubble?.border?.color ? c.bubble.border.color : c.primaryColor,
        bubbleFromUserBorderWidth: c?.bubble?.border?.width,
        bubbleFromUserBorderColor: c?.bubble?.border?.color ? c.bubble.border.color : c.primaryColor,
        sendBoxBackground: c.sendBox?.background,
        sendBoxHeight: c.sendBox?.height,
        sendBoxButtonColor: c.sendBox?.button?.color ? c.sendBox.button.color : c.primaryColor,
        sendBoxButtonShadeInset: c.sendBox?.button?.shadeInset,
        avatarSize: 20, // TODO avatar style
        userAvatarBackgroundColor: c.primaryColor, // TODO avatar style
        suggestedActionLayout: c.suggestedAction?.layout ? c.suggestedAction.layout : SUGGESTED_ACTION_LAYOUT,
        suggestedActionTextColor: c.suggestedAction?.textColor?.base
            ? c.suggestedAction.textColor.base
            : c.primaryColor,
        suggestedActionBorderColor: c.suggestedAction?.border?.color?.base
            ? c.suggestedAction?.border.color.base
            : c.primaryColor,
        suggestedActionBorderWidth: c.suggestedAction?.border?.width?.base,
        suggestedActionImageHeight: c.suggestedAction?.imageHeight
            ? c.suggestedAction.imageHeight
            : SUGGESTED_ACTION_IMAGE_HEIGHT,
        suggestedActionHeight: c.suggestedAction?.height,
        // bot avatar have to be defined in channelData
        // botAvatarImage: "/bot-avatar.jpg",
        // botAvatarInitials: "B",
    };

    // timestamp grouping https://microsoft.github.io/BotFramework-WebChat/05.custom-components/a.timestamp-grouping/?ts=default
    styleOptions.groupTimestamp = import.meta.env.VITE_GROUP_BY_SECONDS * 1000;

    // user avatar
    if (user) {
        styleOptions.userAvatarInitials = getInitials(user.name);
        if (user.avatarImage) {
            styleOptions.userAvatarImage = user.avatarImage;
        } else {
            // styleOptions.userAvatarImage = getBase64Prefix(configuration.logo); // REMOVE - TEST ONLY
        }
    }

    return styleOptions;
};
