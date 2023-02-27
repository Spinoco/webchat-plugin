import { CSSProperties } from "react";

/**
 * Creates styles for the wrapper above the chat window. It is used for show or hide chat.
 */
export const createChatBoxWrapperCssVariables = (isVisible: boolean): CSSProperties => {
    let chatBoxWrapperStyles: CSSProperties = {};
    if (!isVisible) {
        chatBoxWrapperStyles = {
            position: "absolute",
            right: -5000,
        };
    }

    return chatBoxWrapperStyles;
};
