export const config = {
    chat: {
        mockbotTokenApiUrl: "https://webchat-mockbot.azurewebsites.net/directline/token",
        apiUrl: import.meta.env.VITE_WEBCHAT_API_URL,
        groupTimestamp: 3, // timestamp grouping https://microsoft.github.io/BotFramework-WebChat/05.custom-components/a.timestamp-grouping/?ts=default
        defaultLanguage: "en",
        wrapperElementHtmlId: "spinoco-webchat-plugin",
        attributes: {
            clientId: "data-client-id",
            customerName: "data-customer-name",
            customerEmail: "data-customer-email",
            avatarUserUrl: "data-avatar-user-url",
            avatarUserBase64: "data-avatar-user-base-64",
            avatarBotUrl: "data-avatar-bot-url",
            avatarBotBase64: "data-avatar-bot-base-64",
        },
        botAvatarInitials: "BOT",
        botAvatarImage: "",
    },
    classes: {
        chatWrapper: "swp-chat-wrapper",
        chatBoxWrapper: "swp-chat-box",
        chat: "swp-chat",
        features: {
            scrollbar: "swp-feature-scrollbar",
            bubbleSingleBorder: "swp-feature-bubble-single-border",
            sendBoxInputBorder: "swp-feature-sendbox-input-border",
            boxShadow: "swp-feature-box-shadow",
        },
    },
    styleProperties: {
        trigger: {
            icon: {
                height: "24px",
                color: "#FFFFFF",
            },
        },
        wrapper: {
            borderRadius: "0px",
        },
        header: {
            logo: {
                height: "20px",
            },
            closeIcon: {
                height: "20px",
                color: "#FFFFFF",
            },
        },
        avatar: {
            fontSize: "12px",
        },
        typingIndicator: {
            background: "#F0F0F0",
            color: "#999999",
        },
    },
};
