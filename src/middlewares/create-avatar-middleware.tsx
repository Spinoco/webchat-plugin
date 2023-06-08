import React from "react";
import AvatarMiddleware from "botframework-webchat-api/src/types/AvatarMiddleware";
import { ImageAvatar } from "../components/image-avatar";
import { InitialsAvatar } from "../components/initials-avatar";
import { BotDto } from "../models/dtos/bot-dto";
import { AvatarRoleInterface } from "../models/interfaces/avatar/avatar-role-interface";

export const createAvatarMiddleware: (bot: BotDto) => AvatarMiddleware = (bot: BotDto) => {
    const avatarMiddleware: AvatarMiddleware = () => () => (props) => {
        // user avatar is defined in app.tsx
        if (props.fromUser) {
            if (props.styleOptions.userAvatarImage) {
                return () => <ImageAvatar image={props.styleOptions.userAvatarImage} />;
            } else if (props.styleOptions.userAvatarInitials) {
                return () => <InitialsAvatar initials={props.styleOptions.userAvatarInitials} />;
            }
            return () => <></>;
        }

        // bot avatar image
        if (props.activity.channelData.botAvatarImageUrl) {
            return () => <ImageAvatar image={props.activity.channelData.botAvatarImageUrl} />;
        }

        if (props.activity.channelData.botAvatarImageBase64) {
            return () => <ImageAvatar image={props.activity.channelData.botAvatarImageBase64} />;
        }

        // bot avatar initials
        if (props.activity.channelData.botAvatarInitials) {
            return () => <InitialsAvatar initials={props.activity.channelData.botAvatarInitials} />;
        }

        // bot avatar image by role
        if (props.activity.channelData.role) {
            if (props.activity.channelData.role === AvatarRoleInterface.User && bot.getUserAvatar()) {
                return () => <ImageAvatar image={bot.getUserAvatar() as string} />;
            } else if (props.activity.channelData.role === AvatarRoleInterface.Bot && bot.getBotAvatar()) {
                return () => <ImageAvatar image={bot.getBotAvatar() as string} />;
            }
        } else if (bot.getBotAvatar()) {
            //fallback to bot avatar
            return () => <ImageAvatar image={bot.getBotAvatar() as string} />;
        }

        return false;
    };

    return avatarMiddleware;
};
