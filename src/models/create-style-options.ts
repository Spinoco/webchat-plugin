import { StyleOptions } from "botframework-webchat-api";
import { UserInterface } from "../interfaces/user-interface";
import { ConfigurationInterface } from "../interfaces/configuration-interface";
import { getInitials } from "../utils/get-initials";

export const createStyleOptions = (c: ConfigurationInterface, user?: UserInterface): StyleOptions => {
    const styleOptions: StyleOptions = {
        accent: c.accent,
        subtle: c.subtle ? c.subtle : c.secondaryColor,
        rootHeight: c.root && c.root.height ? c.root.height : "500px",
        rootWidth: c.root && c.root.width ? c.root.width : "400px",
        rootZIndex: c.root && c.root.zIndex ? c.root.zIndex : undefined,
        bubbleBorderWidth: c?.bubble?.border?.width,
        bubbleBorderColor: c?.bubble?.border?.color,
        bubbleFromUserBorderWidth: c?.bubble?.border?.width,
        bubbleFromUserBorderColor: c?.bubble?.border?.color,
        sendBoxBackground: c.sendBox?.background,
        sendBoxHeight: c.sendBox?.height,
        sendBoxButtonColor: c.sendBox?.button?.color ? c.sendBox.button.color : c.primaryColor,
        sendBoxButtonShadeInset: c.sendBox?.button?.shadeInset,
        avatarSize: 20,
        userAvatarBackgroundColor: c.primaryColor,
        // bot avatar have to be defined in channelData
        // botAvatarImage: "/bot-avatar.jpg",
        // botAvatarInitials: "B",
    };

    // timestamp grouping https://microsoft.github.io/BotFramework-WebChat/05.custom-components/a.timestamp-grouping/?ts=default
    styleOptions.groupTimestamp = import.meta.env.VITE_GROUP_BY_SECONDS * 1000;

    styleOptions.botAvatarBackgroundColor = "red";
    styleOptions.botAvatarInitials = "a";
    styleOptions.userAvatarBackgroundColor = "blue";

    // user avatar
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
