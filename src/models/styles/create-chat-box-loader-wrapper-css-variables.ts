import { CSSProperties } from "react";
import { RootInterface } from "../interfaces/configuration/root-interface";

export const createChatBoxLoaderWrapperCssVariables = (root?: RootInterface): CSSProperties => {
    const chatBoxLoaderWrapperStyles: CSSProperties = {};

    chatBoxLoaderWrapperStyles.position = "absolute";
    chatBoxLoaderWrapperStyles.background = "#FFFFFF";
    chatBoxLoaderWrapperStyles.width = root?.width || "100%";
    chatBoxLoaderWrapperStyles.height = root?.height || "100%";

    console.log(chatBoxLoaderWrapperStyles);

    return chatBoxLoaderWrapperStyles;
};
