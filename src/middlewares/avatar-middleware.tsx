import React from "react";
import AvatarMiddleware from "botframework-webchat-api/src/types/AvatarMiddleware";
import { ImageAvatar } from "../components/image-avatar";
import { InitialsAvatar } from "../components/initials-avatar";
import { config } from "../config/config";

export const avatarMiddleware: AvatarMiddleware = () => () => (props) => {
    // user avatar is defined in app.tsx
    if (props.fromUser) {
        if (props.styleOptions.userAvatarImage) {
            return () => <ImageAvatar image={props.styleOptions.userAvatarImage} />;
        } else if (props.styleOptions.userAvatarInitials) {
            return () => <InitialsAvatar initials={props.styleOptions.userAvatarInitials} />;
        }
        return () => <></>;
    }

    // bot avatar is defined from channelData or default from config
    let botAvatarInitials: string | null = null;
    if (props.activity.channelData.botAvatarInitials) {
        botAvatarInitials = props.activity.channelData.botAvatarInitials;
    }

    let botAvatarImage: string | null = null;
    if (props.activity.channelData.botAvatarImage) {
        botAvatarImage = props.activity.channelData.botAvatarImage;
    }

    if (botAvatarImage !== null) {
        return () => <ImageAvatar image={botAvatarImage as string} />;
    } else if (botAvatarInitials !== null) {
        return () => <InitialsAvatar initials={botAvatarInitials as string} />;
    }

    if (config.chat.botAvatarImage.length > 0) {
        return () => <ImageAvatar image={config.chat.botAvatarImage} />;
    } else if (config.chat.botAvatarInitials) {
        return () => <InitialsAvatar initials={config.chat.botAvatarInitials} />;
    }

    return () => <></>;
};
