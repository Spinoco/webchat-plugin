import { createDirectLine as createLine } from "botframework-webchat";
import { ConversationIdStorage } from "../services/conversation-id-storage";
import { DirectLine } from "botframework-directlinejs";

export const createDirectLine = (token: string) => {
    const conversationId = ConversationIdStorage.get();
    const botConnection: DirectLine = createLine({ token, watermark: "0", conversationId });

    botConnection.connectionStatus$.subscribe(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const conversationId = botConnection.conversationId;
        if (conversationId) {
            ConversationIdStorage.set(conversationId);
        }
    });

    return botConnection;
};
