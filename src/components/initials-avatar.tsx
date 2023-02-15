import React from "react";

interface InitialsAvatarProps {
    initials: string;
}

export const InitialsAvatar: React.FC<InitialsAvatarProps> = ({ initials }) => {
    return <div className="webchat__initialsAvatar__initials">{initials}</div>;
};
