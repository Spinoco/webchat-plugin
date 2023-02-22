import { CSSProperties } from "react";

/**
 * Vytvoří styly pro wrapper nad oknem s chatem. Slouží především pro show hide.
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
