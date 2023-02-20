export const config = {
    chat: {
        mockbotTokenApiUrl: "https://webchat-mockbot.azurewebsites.net/directline/token",
        apiUrl: import.meta.env.VITE_WEBCHAT_API_URL,
        token: import.meta.env.VITE_BOT_TOKEN,
        groupTimestamp: 3, // timestamp grouping https://microsoft.github.io/BotFramework-WebChat/05.custom-components/a.timestamp-grouping/?ts=default
        id: "spinoco-webchat-plugin",
        attributes: {
            clientId: "data-client-id",
            userName: "data-user-name",
            userEmail: "data-user-email",
            userAvatarUrl: "data-user-avatar-url",
        },
        botAvatarInitials: "BOT",
        botAvatarImage: "",
    },
    classes: {
        chatWrapper: "swp-chat-wrapper",
        chatBoxWrapper: "swp-chat-box",
        openedWrapper: "swp-opened",
        hiddenWrapper: "swp-hidden",
        chat: "swp-chat",
        features: {
            scrollbar: "swp-feature-scrollbar",
            bubbleSingleBorder: "swp-feature-bubble-single-border",
            sendBoxInputBorder: "swp-feature-sendbox-input-border",
        },
    },
};
