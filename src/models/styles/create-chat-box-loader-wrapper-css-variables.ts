import { CSSProperties } from "react";
import { RootInterface } from "../interfaces/configuration/root-interface";

export const createChatBoxLoaderWrapperCssVariables = (useMockbot?: boolean, root?: RootInterface): CSSProperties => {
    const chatBoxLoaderWrapperStyles: CSSProperties = {};

    chatBoxLoaderWrapperStyles.position = "absolute";
    if (useMockbot) {
        chatBoxLoaderWrapperStyles.background = "#FFFFFF";
        chatBoxLoaderWrapperStyles.width = root?.width || "400px";
        chatBoxLoaderWrapperStyles.height = root?.height || "540px";
        chatBoxLoaderWrapperStyles.right = 0;
        chatBoxLoaderWrapperStyles.bottom = 0;
    } else {
        chatBoxLoaderWrapperStyles.background = "#FFFFFF";
        chatBoxLoaderWrapperStyles.width = root?.width || "100%";
        chatBoxLoaderWrapperStyles.height = root?.height || "100%";
    }

    return chatBoxLoaderWrapperStyles;
};
