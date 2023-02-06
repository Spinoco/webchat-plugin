import React from "react";

interface InitialsAvatarProps {
    initials: string;
}

export const InitialsAvatar: React.FC<InitialsAvatarProps> = ({ initials }) => {
    return <span>{initials}</span>;
};
