import { StyleOptions } from "botframework-webchat-api";
import { getInitials } from "./get-initials";
import { UserInterface } from "../interfaces/user-interface";
import { ConfigurationInterface } from "../interfaces/configuration-interface";

export const createStyleOptions = (configuration: ConfigurationInterface, user?: UserInterface): StyleOptions => {
    const styleOptions: StyleOptions = {
        sendBoxBackground: configuration.sendBoxBackground,
        // bot avatar have to be defined in channelData
        // botAvatarImage: "/bot-avatar.jpg",
        // botAvatarInitials: "B",
    };

    if (user) {
        styleOptions["userAvatarInitials"] = getInitials(user.name);
        if (user.avatarImage) {
            styleOptions["userAvatarImage"] = user.avatarImage;
        }
    }

    return styleOptions;
};
