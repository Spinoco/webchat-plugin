import React from "react";
// import { AvatarMiddleware } from "botframework-webchat-api";

// interface PortraitAvatarProps {
//     fromUser: boolean;
// }

// const PortraitAvatar: React.FC<PortraitAvatarProps> = (props) => {
//     return (
//         <img
//             className="app__portraitAvatar"
//             src={props.fromUser ? "react.svg" : "react.svg"}
//             style={{ borderRadius: 4 }}
//         />
//     );
// };

export const avatarMiddleware: React.FC = () => {
    console.log("Not implemented yet!");
    return null;
};

// export const avatarMiddleware: AvatarMiddleware = () => (next) => (props) => {
//     console.log(next, props);
//     // const { text = "" } = activity;
//     //
//     // if (~text.indexOf("1")) {
//     //     return false;
//     // } else if (~text.indexOf("2")) {
//     //     return <PortraitAvatar fromUser={fromUser} />;
//     // }
//
//     return <PortraitAvatar fromUser={props.fromUser} />;
//
//     // const renderNext = next(props);
//     // return renderNext && (() => <PortraitAvatar fromUser={props.fromUser}>{renderNext()}</PortraitAvatar>);
// };
