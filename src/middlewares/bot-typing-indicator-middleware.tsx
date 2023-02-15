import React from "react";
import TypingIndicatorMiddleware from "botframework-webchat-api/src/types/TypingIndicatorMiddleware";

export const botTypingIndicatorMiddleware: TypingIndicatorMiddleware = () => () => (props) => {
    const activeTyping = Object.values(props.activeTyping).filter((at) => at.role === "bot");

    if (activeTyping.length === 0) {
        return null;
    }

    return (
        <div className="webchat__typingIndicator">
            <div className="webchat__typingIndicator--dots">
                <div className="webchat__typingIndicator--dot"></div>
                <div className="webchat__typingIndicator--dot"></div>
                <div className="webchat__typingIndicator--dot"></div>
            </div>
        </div>
    );
};
