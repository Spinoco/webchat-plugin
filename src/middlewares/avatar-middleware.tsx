import React from "react";
import AvatarMiddleware from "botframework-webchat-api/src/types/AvatarMiddleware";
import { ImageAvatar } from "../components/image-avatar";
import { InitialsAvatar } from "../components/initials-avatar";

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

    // bot avatar is defined from channelData
    let botAvatarInitials: string | null = null;
    if (props.activity.channelData.botAvatarInitials) {
        botAvatarInitials = props.activity.channelData.botAvatarInitials;
    }

    let botAvatarImage: string | null = null;
    if (props.activity.channelData.botAvatarImage) {
        botAvatarImage = props.activity.channelData.botAvatarImage;
    }

    if (botAvatarImage !== null) {
        return () => (botAvatarImage ? <ImageAvatar image={botAvatarImage} /> : <></>); // FIXME: fix this issue
    } else if (botAvatarInitials !== null) {
        return () => (botAvatarInitials ? <InitialsAvatar initials={botAvatarInitials} /> : <></>); // FIXME: fix this issue
    }
    return () => <></>;
};
