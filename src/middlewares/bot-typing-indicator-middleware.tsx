import React from "react";
import TypingIndicatorMiddleware from "botframework-webchat-api/src/types/TypingIndicatorMiddleware";

export const botTypingIndicatorMiddleware: TypingIndicatorMiddleware = () => (next) => (props) => {
    const activeTyping = Object.values(props.activeTyping).filter((at) => at.role === "bot");

    if (activeTyping.length === 0) {
        return null;
    }

    return (
        <span className="webchat__typingIndicator">
            ...
        </span>
    );
};
