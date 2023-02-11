import { createDirectLine } from "botframework-webchat";
import { ConversationIdStorage } from "../services/conversation-id-storage";
import { DirectLine } from "botframework-directlinejs";

export const createSpinocoDirectLine = (token: string) => {
    const conversationId = ConversationIdStorage.get();
    console.log("createSpinocoDirectLine: ", conversationId);
    const botConnection: DirectLine = createDirectLine({ token, watermark: "0", conversationId });

    botConnection.connectionStatus$.subscribe(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const conversationId = botConnection.conversationId;
        if (conversationId) {
            console.log("createSpinocoDirectLine set: ", conversationId, botConnection);
            ConversationIdStorage.set(conversationId);
        }
    });

    // window.addEventListener("error", (event) => {
    //     //handle only error from webchat js file
    //     if (event && event.filename == WEBCHAT_URI) {
    //         if (event.error &&
    //             event.error.response &&
    //             event.error.response.error &&
    //             event.error.response.error.code == "BadArgument" &&
    //             event.error.response.error.message == "Conversation not found"
    //         ) {
    //             __spWebChat.startNewConversation()
    //         }
    //
    //         console.log("Error, ",event)
    //         return true;
    //     }
    // });

    return botConnection;
};
