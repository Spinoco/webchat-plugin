import { UserInterface } from "../interfaces/user-interface";

export const createUserFromWrapperData = (wrapperElement: HTMLElement): UserInterface | undefined => {
    const userName = wrapperElement.getAttribute("data-user-name");
    const userEmail = wrapperElement.getAttribute("data-user-email");
    const userAvatarUrl = wrapperElement.getAttribute("data-user-avatar-url");

    let user: UserInterface | undefined = undefined;
    if (userName && userName.length && userEmail && userEmail.length) {
        user = {
            name: userName,
            email: userEmail,
            avatarUrl: null,
        };

        if (userAvatarUrl) {
            user["avatarUrl"] = userAvatarUrl;
        }
    }

    return user;
};
