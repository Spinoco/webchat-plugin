import React, { useContext } from "react";
import { AvatarMiddleware } from "botframework-webchat-api";

interface PortraitAvatarProps {
    fromUser: boolean;
    children: React.ReactNode;
}

const PortraitAvatar: React.FC<PortraitAvatarProps> = ({ fromUser, children }) => {
    return <img className="app__portraitAvatar" src={fromUser ? "react.svg" : "react.svg"} style={{ borderRadius: 4 }} />;
};

export const avatarMiddleware: AvatarMiddleware = () => (next) => (props) => {
    console.log(props);
    // const { text = "" } = activity;
    //
    // if (~text.indexOf("1")) {
    //     return false;
    // } else if (~text.indexOf("2")) {
    //     return <PortraitAvatar fromUser={fromUser} />;
    // }

    const renderNext = next(props);
    return renderNext && (() => <PortraitAvatar fromUser={props.fromUser}>{renderNext()}</PortraitAvatar>);
};
