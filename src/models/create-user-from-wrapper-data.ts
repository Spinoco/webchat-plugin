import { UserInterface } from "../interfaces/user-interface";

export const createUserFromWrapperData = (wrapperElement: HTMLElement): UserInterface | undefined => {
    const userName = wrapperElement.getAttribute("data-user-name");
    const userEmail = wrapperElement.getAttribute("data-user-email");
    const userAvatarImage = wrapperElement.getAttribute("data-user-avatar-image");

    let user: UserInterface | undefined = undefined;
    if (userName && userName.length && userEmail && userEmail.length) {
        user = {
            name: userName,
            email: userEmail,
            avatarImage: null,
        };

        if (userAvatarImage) {
            // TODO: validate url
            // user["avatarImage"] = userAvatarImage;
        }
    }

    return user;
};
