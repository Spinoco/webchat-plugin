export const config = {
    chat: {
        mockbotTokenApiUrl: "https://webchat-mockbot.azurewebsites.net/directline/token",
        apiUrl: import.meta.env.VITE_WEBCHAT_API_URL,
        groupTimestamp: 3, // timestamp grouping https://microsoft.github.io/BotFramework-WebChat/05.custom-components/a.timestamp-grouping/?ts=default
        defaultLanguage: "en",
        wrapperElementHtmlId: "spinoco-webchat-plugin",
        attributes: {
            clientId: "data-client-id",
            configUrl: "data-config-url",
            customerName: "data-customer-name",
            customerEmail: "data-customer-email",
            customerPhone: "data-customer-phone",
            customerExternalId: "data-customer-external-id",
            avatarUserUrl: "data-avatar-user-url",
            avatarUserBase64: "data-avatar-user-base-64",
            avatarBotUrl: "data-avatar-bot-url",
            avatarBotBase64: "data-avatar-bot-base-64",
        },
        botAvatarInitials: "BOT",
        botAvatarImage: "",
    },
    popover: {
        attributes: {
            label: "data-popover-label",
            buttonLabel: "data-popover-button-label",
            delay: "data-popover-delay",
        },
    },
    feedbackApiUrl: import.meta.env.VITE_FEEDBACK_API_URL,
    classes: {
        chatWrapper: "swp-chat-wrapper",
        chatBoxWrapper: "swp-chat-box",
        chatBoxLoaderWrapper: "swp-chat-box-loader-wrapper",
        chatBoxLoader: "swp-chat-box-loader",
        chat: "swp-chat",
        features: {
            scrollbar: "swp-feature-scrollbar",
            bubbleSingleBorder: "swp-feature-bubble-single-border",
            sendBoxInputBorder: "swp-feature-sendbox-input-border",
            boxShadow: "swp-feature-box-shadow",
        },
    },
    styleProperties: {
        sendBox: {
            button: {
                shadeColorOnHover: "#F3F2F1",
                shadeColor: "transparent",
            },
        },
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
        popover: {
            borderRadius: "16px",
            head: {
                logo: {
                    base64: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTAiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA5MCA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkwIDMyLjYzNkM5MCAyNy41MyA4NS45OTEgMjQuMzk2IDgxLjE4NyAyNC4zOTZDNzYuNDE1IDI0LjM5NiA3Mi40MDYgMjcuNTI5IDcyLjQwNiAzMi42MzZDNzIuNDA2IDM3Ljc0MyA3Ni40MTQgNDEgODEuMTg3IDQxQzg1Ljk4NyA0MSA5MCAzNy43NDIgOTAgMzIuNjM2Wk04NC45NzMgMzIuNjM2Qzg1LjAxMTcgMzMuMTUyNyA4NC45NDMzIDMzLjY3MTcgODQuNzcyMiAzNC4xNjA4Qzg0LjYwMSAzNC42NDk4IDg0LjMzMDcgMzUuMDk4MiA4My45NzgzIDM1LjQ3OEM4My42MjU5IDM1Ljg1NzggODMuMTk4OSAzNi4xNjA3IDgyLjcyNCAzNi4zNjc5QzgyLjI0OTIgMzYuNTc1MSA4MS43MzY2IDM2LjY4MiA4MS4yMTg1IDM2LjY4MkM4MC43MDA0IDM2LjY4MiA4MC4xODc5IDM2LjU3NTEgNzkuNzEzIDM2LjM2NzlDNzkuMjM4MSAzNi4xNjA3IDc4LjgxMTEgMzUuODU3OCA3OC40NTg3IDM1LjQ3OEM3OC4xMDYzIDM1LjA5ODIgNzcuODM2IDM0LjY0OTggNzcuNjY0OSAzNC4xNjA4Qzc3LjQ5MzcgMzMuNjcxNyA3Ny40MjU0IDMzLjE1MjcgNzcuNDY0IDMyLjYzNkM3Ny40Mjg5IDMyLjEyNjEgNzcuNDk5MSAzMS42MTQ0IDc3LjY3MDMgMzEuMTMyOEM3Ny44NDE2IDMwLjY1MTIgNzguMTEwMSAzMC4yMSA3OC40NTkzIDI5LjgzNjdDNzguODA4NSAyOS40NjM0IDc5LjIzMDggMjkuMTY2IDc5LjY5OTkgMjguOTYzMUM4MC4xNjkgMjguNzYwMSA4MC42NzQ5IDI4LjY1NTkgODEuMTg2IDI4LjY1N0M4MS43MDAzIDI4LjY1NDggODIuMjA5NyAyOC43NTc2IDgyLjY4MjggMjguOTU5M0M4My4xNTU5IDI5LjE2MSA4My41ODI4IDI5LjQ1NzIgODMuOTM3MyAyOS44Mjk4Qzg0LjI5MTkgMzAuMjAyNCA4NC41NjY1IDMwLjY0MzUgODQuNzQ0NCAzMS4xMjYxQzg0LjkyMjQgMzEuNjA4NiA4NC45OTk4IDMyLjEyMjQgODQuOTcyIDMyLjYzNkg4NC45NzNaTTc2Ljg3MiAxNi41MzZDNzYuODcyIDExLjQzIDcyLjg2MyA4LjI5NjAxIDY4LjA1OCA4LjI5NjAxQzYzLjI4NiA4LjI5NjAxIDU5LjI3OCAxMS40MjkgNTkuMjc4IDE2LjUzNkM1OS4yNDI3IDE4LjQ0MzggNTkuODgxMiAyMC4zMDI5IDYxLjA4MTIgMjEuNzg2NUM2Mi4yODEzIDIzLjI3IDYzLjk2NiAyNC4yODI5IDY1LjgzOSAyNC42NDdDNjMuOTY2NyAyNC45ODg5IDYyLjI3NzYgMjUuOTg3MSA2MS4wNzUxIDI3LjQ2MjNDNTkuODcyNiAyOC45Mzc2IDU5LjIzNTQgMzAuNzkzMiA1OS4yNzggMzIuNjk2QzU5LjI3OCAzNy44NjYgNjMuMTU5IDQwLjk5NiA2OC4xNTQgNDAuOTk2QzcwLjA5NCA0MS4wNDI2IDcxLjk5NzkgNDAuNDY2OCA3My41ODcgMzkuMzUzTDcxLjA4NyAzNS41MzhDNzAuNzIwNCAzNS45MDggNzAuMjgyMyAzNi4xOTk1IDY5Ljc5OTMgMzYuMzk0NkM2OS4zMTY0IDM2LjU4OTggNjguNzk4OCAzNi42ODQ1IDY4LjI3OCAzNi42NzNDNjcuMjczMiAzNi42MDA0IDY2LjMzMjYgMzYuMTUyIDY1LjY0MzUgMzUuNDE3MkM2NC45NTQzIDM0LjY4MjQgNjQuNTY3MiAzMy43MTQ5IDY0LjU1OTEgMzIuNzA3NUM2NC41NTEgMzEuNzAwMSA2NC45MjI2IDMwLjcyNjcgNjUuNTk5OSAyOS45ODA5QzY2LjI3NzIgMjkuMjM1MSA2Ny4yMTA1IDI4Ljc3MTcgNjguMjE0IDI4LjY4M0M2OC43MzgzIDI4LjY4MTMgNjkuMjU2NyAyOC43OTIyIDY5LjczNDMgMjkuMDA4NEM3MC4yMTE5IDI5LjIyNDYgNzAuNjM3NCAyOS41NDEgNzAuOTgyIDI5LjkzNkw3My41MTcgMjYuMDYyQzcyLjU1NjkgMjUuMzY3IDcxLjQ2MDUgMjQuODgzMSA3MC4zIDI0LjY0MkM3Mi4xNzQyIDI0LjI4IDczLjg2MDYgMjMuMjY4NCA3NS4wNjIyIDIxLjc4NTJDNzYuMjYzOCAyMC4zMDIxIDc2LjkwMzcgMTguNDQyNSA3Ni44NjkgMTYuNTM0TDc2Ljg3MiAxNi41MzZaTTcxLjg0MSAxNi41MzRDNzEuODc4NyAxNy4wNSA3MS44MDk2IDE3LjU2ODMgNzEuNjM4IDE4LjA1NjRDNzEuNDY2NSAxOC41NDQ1IDcxLjE5NjEgMTguOTkyIDcwLjg0MzggMTkuMzcxQzcwLjQ5MTUgMTkuNzQ5OSA3MC4wNjQ5IDIwLjA1MjIgNjkuNTkwNiAyMC4yNTg4QzY5LjExNjIgMjAuNDY1NSA2OC42MDQ0IDIwLjU3MjIgNjguMDg3IDIwLjU3MjJDNjcuNTY5NiAyMC41NzIyIDY3LjA1NzggMjAuNDY1NSA2Ni41ODM0IDIwLjI1ODhDNjYuMTA5MSAyMC4wNTIyIDY1LjY4MjUgMTkuNzQ5OSA2NS4zMzAyIDE5LjM3MUM2NC45NzggMTguOTkyIDY0LjcwNzYgMTguNTQ0NSA2NC41MzYgMTguMDU2NEM2NC4zNjQ0IDE3LjU2ODMgNjQuMjk1MyAxNy4wNSA2NC4zMzMgMTYuNTM0QzY0LjI5NzkgMTYuMDI0IDY0LjM2ODEgMTUuNTEyMyA2NC41MzkzIDE1LjAzMDZDNjQuNzEwNiAxNC41NDkgNjQuOTc5MSAxNC4xMDc3IDY1LjMyODIgMTMuNzM0NEM2NS42Nzc0IDEzLjM2MSA2Ni4wOTk3IDEzLjA2MzUgNjYuNTY4OCAxMi44NjA1QzY3LjAzNzkgMTIuNjU3NCA2Ny41NDM4IDEyLjU1MzEgNjguMDU1IDEyLjU1NEM2OC41Njk0IDEyLjU1MTcgNjkuMDc4OCAxMi42NTQ2IDY5LjU1MiAxMi44NTY0QzcwLjAyNTIgMTMuMDU4MSA3MC40NTIyIDEzLjM1NDQgNzAuODA2NyAxMy43MjcxQzcxLjE2MTMgMTQuMDk5OCA3MS40MzU5IDE0LjU0MTEgNzEuNjEzOCAxNS4wMjM4QzcxLjc5MTYgMTUuNTA2NCA3MS44Njg5IDE2LjAyMDQgNzEuODQxIDE2LjUzNFpNNTMuMjgxIDI0LjM5N0g1OC41M1YxNC43NDdDNTguNTMgMTEuNjE1IDU3LjAwMyA4LjM1NzAxIDUyLjc0IDguMzU3MDFDNTEuNzkxNCA4LjMzNzY1IDUwLjg1NDIgOC41Njc1OSA1MC4wMjIzIDkuMDIzODVDNDkuMTkwMyA5LjQ4MDEgNDguNDkyNyAxMC4xNDY3IDQ3Ljk5OSAxMC45NTdINDcuOTM2VjguNzk1MDFINDIuODc2VjI0LjM5NUg0OC4xMjZWMTUuOTM2QzQ4LjEyNiAxNC4xNSA0OS4wOCAxMi41ODQgNTAuOTI2IDEyLjU4NEM1Mi44MDMgMTIuNTg0IDUzLjI4MSAxNC4xNSA1My4yODEgMTUuODc0VjI0LjM5N1pNNDEuNzcgMy45OTEwMUM0MS43NzkzIDMuMzg4MTkgNDEuNjA5MSAyLjc5NjIzIDQxLjI4MDkgMi4yOTA0N0M0MC45NTI4IDEuNzg0NzEgNDAuNDgxNiAxLjM4ODAxIDM5LjkyNzMgMS4xNTA4N0MzOS4zNzMgMC45MTM3NDEgMzguNzYwNyAwLjg0Njg5NCAzOC4xNjgzIDAuOTU4ODM1QzM3LjU3NTkgMS4wNzA3OCAzNy4wMzAyIDEuMzU2NDUgMzYuNjAwNiAxLjc3OTQ5QzM2LjE3MTEgMi4yMDI1MyAzNS44NzcxIDIuNzQzODEgMzUuNzU2MiAzLjMzNDQ0QzM1LjYzNTIgMy45MjUwNyAzNS42OTI3IDQuNTM4MzMgMzUuOTIxMyA1LjA5NjE4QzM2LjE1IDUuNjU0MDMgMzYuNTM5NCA2LjEzMTIzIDM3LjA0MDEgNi40NjcwNUMzNy41NDA4IDYuODAyODggMzguMTMwMSA2Ljk4MjEzIDM4LjczMyA2Ljk4MjAxQzM5LjEyODggNi45ODUwNCAzOS41MjEzIDYuOTEwMDggMzkuODg4MiA2Ljc2MTQxQzQwLjI1NSA2LjYxMjc0IDQwLjU4OSA2LjM5MzI2IDQwLjg3MSA2LjExNTUyQzQxLjE1MyA1LjgzNzc4IDQxLjM3NzUgNS41MDcyMSA0MS41MzE4IDUuMTQyNjhDNDEuNjg2MSA0Ljc3ODE2IDQxLjc2NyA0LjM4NjgyIDQxLjc3IDMuOTkxMDFaTTM1LjM4IDE2LjUzOUMzNS4zOCAxMi4xODQgMzIuNDggOC4zNjIwMSAyNy44NzIgOC4zNjIwMUMyNi45MDUzIDguMzQwOTUgMjUuOTQ2NyA4LjU0MTc0IDI1LjA2OTcgOC45NDg5NEMyNC4xOTI3IDkuMzU2MTQgMjMuNDIwNyA5Ljk1ODkzIDIyLjgxMyAxMC43MTFIMjIuNzEzVjguODAxMDFIMTcuNzVWMzEuOTIySDIyLjk2OFYyMi42NzVIMjMuMDMxQzIzLjYxNCAyMy4zNzY3IDI0LjM0OTMgMjMuOTM2MyAyNS4xODExIDI0LjMxMTFDMjYuMDEyOSAyNC42ODU5IDI2LjkxOTEgMjQuODY2MSAyNy44MzEgMjQuODM4QzMyLjYwMyAyNC44MzggMzUuMzcxIDIwLjg5IDM1LjM3MSAxNi41MzhMMzUuMzggMTYuNTM5Wk0zMC4zMTIgMTYuNTM4QzMwLjM1MzEgMTcuMDUxMyAzMC4yODc2IDE3LjU2NzYgMzAuMTE5OCAxOC4wNTQ0QzI5Ljk1MiAxOC41NDEyIDI5LjY4NTUgMTguOTg4MiAyOS4zMzY5IDE5LjM2NzJDMjguOTg4MyAxOS43NDYyIDI4LjU2NTIgMjAuMDQ5MSAyOC4wOTQxIDIwLjI1NjlDMjcuNjIyOSAyMC40NjQ4IDI3LjExMzkgMjAuNTczMSAyNi41OTkgMjAuNTc1QzI1LjU2ODIgMjAuNTI2MiAyNC41OTU4IDIwLjA4MjMgMjMuODgzNiAxOS4zMzU1QzIzLjE3MTQgMTguNTg4OCAyMi43NzQgMTcuNTk2NSAyMi43NzQgMTYuNTY0NUMyMi43NzQgMTUuNTMyNiAyMy4xNzE0IDE0LjU0MDIgMjMuODgzNiAxMy43OTM1QzI0LjU5NTggMTMuMDQ2NyAyNS41NjgyIDEyLjYwMjggMjYuNTk5IDEyLjU1NEMyNy4xMTEyIDEyLjU0OTUgMjcuNjE4OCAxMi42NTE0IDI4LjA4OTYgMTIuODUzMkMyOC41NjA0IDEzLjA1NTEgMjguOTg0MiAxMy4zNTI1IDI5LjMzNCAxMy43MjY2QzI5LjY4MzkgMTQuMTAwOCAyOS45NTIzIDE0LjU0MzUgMzAuMTIyMiAxNS4wMjY3QzMwLjI5MjEgMTUuNTEgMzAuMzU5OCAxNi4wMjMyIDMwLjMyMSAxNi41MzRMMzAuMzEyIDE2LjUzOFpNMTMuNzQ0IDcuOTgxMDFMMTcuMjExIDQuMzgxMDFDMTUuMTUzOCAyLjYyMzA3IDEyLjUzNyAxLjY1NjggOS44MzEwMiAxLjY1NjAxQzUuNjMxMDIgMS42NTYwMSAxLjExMzAxIDMuNjkyMDEgMS4xMTMwMSA4LjYxMTAxQzEuMTEzMDEgMTIuNjIxIDQuMDEzMDEgMTQuMDYyIDYuODcyMDEgMTQuOTcxQzkuODMxMDEgMTUuOTEgMTEuNTQ5IDE2LjQ0MyAxMS41NDkgMTguMTM0QzExLjU0OSAxOS45MiAxMC4wODUgMjAuNTQ3IDguNDMxIDIwLjU0N0M3LjUwMDg3IDIwLjUxNDkgNi41ODc2NSAyMC4yODkzIDUuNzQ5NTEgMTkuODg0N0M0LjkxMTM3IDE5LjQ4MDEgNC4xNjY3MiAxOC45MDUzIDMuNTYzMDIgMTguMTk3TDAgMjEuNzY4QzIuMjg2MjIgMjMuODkyMiA1LjMxMTEzIDI1LjA0MDMgOC40MzEgMjQuOTY4QzEyLjg4NSAyNC45NjggMTcuMDUzIDIyLjY4IDE3LjA1MyAxNy41NzRDMTcuMDUzIDEzLjE1NyAxMy4xMDcgMTEuODc0IDEwLjA1MyAxMC45MDFDNy45MjIwMSAxMC4yNDQgNi41ODYgOS43NzQwMSA2LjU4NiA4LjMwMTAxQzYuNTg2IDYuNTQ2MDEgOC4zMzYwMiA2LjA3NzAxIDkuNzM1MDIgNi4wNzcwMUMxMC40OTk1IDYuMDk4NTUgMTEuMjUxMSA2LjI3OTY4IDExLjk0MTUgNi42MDg3OEMxMi42MzE5IDYuOTM3ODcgMTMuMjQ1OSA3LjQwNzY2IDEzLjc0NCA3Ljk4ODAxVjcuOTgxMDFaTTQxLjM0NCA4LjgwM0gzNi4xMjdWMjQuNDAzSDQxLjM0NFY4LjgwM1oiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo=",
                    height: "16px",
                },
                borderColor: "#51585D",
                backgroundColor: "#ffffff",
                closeBtnColor: "#000000",
            },
            body: {
                titleColor: "#000000",
                backgroundColor: "#ffffff",
                descriptionColor: "#cccccc",
                button: {
                    backgroundColor: "#0072BF",
                    color: "#ffffff",
                    iconColor: "#ffffff",
                },
            },
        },
        avatar: {
            fontSize: "12px",
        },
        typingIndicator: {
            background: "#F0F0F0",
            color: "#999999",
        },
        loader: {
            color: "#999999",
        },
        suggestedAction: {
            border: {
                style: "solid",
                radius: "4px",
                width: "1px",
            },
        },
        linkColor: "#FFFFFF",
    },
};
