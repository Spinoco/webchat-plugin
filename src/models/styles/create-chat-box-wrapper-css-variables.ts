import { CSSProperties } from "react";

/**
 * Creates styles for the wrapper above the chat window. It is used for show or hide chat.
 */
export const createChatBoxWrapperCssVariables = (isVisible: boolean): CSSProperties => {
    let chatBoxWrapperStyles: CSSProperties = {};
    if (!isVisible) {
        chatBoxWrapperStyles = {
            visibility: "hidden",
            width: 0,
            height: 0,
        };
    }

    return chatBoxWrapperStyles;
};
