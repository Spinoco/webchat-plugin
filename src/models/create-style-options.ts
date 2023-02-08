import { StyleOptions } from "botframework-webchat-api";
import { UserInterface } from "../interfaces/user-interface";
import { ConfigurationInterface } from "../interfaces/configuration-interface";
import { getBase64Prefix } from "../utils/get-base64-prefix";
import { getInitials } from "../utils/get-initials";

export const createStyleOptions = (configuration: ConfigurationInterface, user?: UserInterface): StyleOptions => {
    const styleOptions: StyleOptions = {
        accent: configuration.accent,
        subtle: configuration.subtle ? configuration.subtle : configuration.secondaryColor,
        rootHeight: configuration.root && configuration.root.height ? configuration.root.height : "500px",
        rootWidth: configuration.root && configuration.root.width ? configuration.root.width : "400px",
        rootZIndex: configuration.root && configuration.root.zIndex ? configuration.root.zIndex : undefined,
        bubbleBorderWidth: configuration.bubbleBorderWidth,
        bubbleBorderColor: configuration.bubbleBorderColor,
        bubbleFromUserBorderWidth: configuration.bubbleBorderWidth,
        bubbleFromUserBorderColor: configuration.bubbleBorderColor,
        sendBoxBackground: configuration.sendBoxBackground,
        sendBoxHeight: configuration.sendBoxHeight,
        sendBoxButtonColor: configuration.sendBoxButtonColor
            ? configuration.sendBoxButtonColor
            : configuration.primaryColor,
        sendBoxButtonShadeInset: configuration.sendBoxButtonShadeInset,
        avatarSize: 20,
        userAvatarBackgroundColor: configuration.primaryColor,
        // bot avatar have to be defined in channelData
        // botAvatarImage: "/bot-avatar.jpg",
        // botAvatarInitials: "B",
    };

    if (user) {
        styleOptions.userAvatarInitials = getInitials(user.name);
        if (user.avatarImage) {
            styleOptions.userAvatarImage = user.avatarImage;
        } else {
            styleOptions.userAvatarImage = getBase64Prefix(configuration.logo); // REMOVE - TEST ONLY
        }
    }

    return styleOptions;
};
