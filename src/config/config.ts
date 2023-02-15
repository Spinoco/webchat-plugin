export const config = {
    chat: {
        apiUrl: import.meta.env.VITE_WEBCHAT_API_URL,
        groupTimestamp: 3, // timestamp grouping https://microsoft.github.io/BotFramework-WebChat/05.custom-components/a.timestamp-grouping/?ts=default
        id: "spinoco-webchat-plugin",
        attributes: {
            clientId: "data-client-id",
            userName: "data-user-name",
            userEmail: "data-user-email",
            userAvatarUrl: "data-user-avatar-url",
        },
    },
    storageKeys: {
        conversationId: "swp-conversation-id",
    },
    classes: {
        chatWrapper: "swp-chat-wrapper",
        chat: "swp-chat",
        features: {
            scrollbar: "swp-feature-scrollbar",
            bubbleSingleBorder: "swp-feature-bubble-single-border",
            sendBoxInputBorder: "swp-feature-sendbox-input-border",
        },
        hideWrapper: "swp-hidden",
    },
};
