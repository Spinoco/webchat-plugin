import { config } from "../../../config/config";
import { DomService } from "./dom-service";
import { UserDto } from "../../dtos/user-dto";

export class ChatDomService extends DomService {
    getClientId(): string {
        return this.getRequiredDataAttribute(config.chat.attributes.clientId);
    }

    getUserDto(): UserDto | undefined {
        const userName = this.getDataAttribute(config.chat.attributes.userName);
        const userEmail = this.getDataAttribute(config.chat.attributes.userEmail);
        const userAvatarUrl = this.getDataAttribute(config.chat.attributes.userAvatarUrl);

        if (userName && userName.length && userEmail && userEmail.length) {
            return new UserDto(userName, userEmail, userAvatarUrl);
        }

        return undefined;
    }
}
