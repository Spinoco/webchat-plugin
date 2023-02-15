import { config } from "../../config/config";

export class UserDto {
    avatarUrl: string | null;

    email: string;

    name: string;

    constructor(name: string, email: string, avatarUrl: string | null) {
        this.name = name;
        this.email = email;
        this.avatarUrl = avatarUrl;
    }

    static createFromWrapperElement(wrapperElement: HTMLElement): UserDto | undefined {
        const userName = wrapperElement.getAttribute(config.chat.attributes.userName);
        const userEmail = wrapperElement.getAttribute(config.chat.attributes.userEmail);
        const userAvatarUrl = wrapperElement.getAttribute(config.chat.attributes.userAvatarUrl);

        if (userName && userName.length && userEmail && userEmail.length) {
            return new UserDto(userName, userEmail, userAvatarUrl);
        }

        return undefined;
    }
}
