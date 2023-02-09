import React from "react";

interface ImageAvatarProps {
    image: string;
}

export const ImageAvatar: React.FC<ImageAvatarProps> = ({ image }) => {
    return <img src={image} alt="" />;
};
