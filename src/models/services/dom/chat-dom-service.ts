import { config } from "../../../config/config";
import { DomService } from "./dom-service";
import { CustomerDto } from "../../dtos/customer-dto";
import { BotDto } from "../../dtos/bot-dto";
import { PopoverDto } from "../../dtos/popover-dto";

export class ChatDomService extends DomService {
    getClientId(): string | null {
        return this.getDataAttribute(config.chat.attributes.clientId);
    }

    getConfigUrl(): string | null {
        return this.getDataAttribute(config.chat.attributes.configUrl);
    }

    /**
     * Creates information about customer.
     */
    getCustomerDto(): CustomerDto | undefined {
        const customerName = this.getDataAttribute(config.chat.attributes.customerName);
        const customerEmail = this.getDataAttribute(config.chat.attributes.customerEmail);

        if (customerName && customerName.length && customerEmail && customerEmail.length) {
            return new CustomerDto(customerName, customerEmail);
        }

        return undefined;
    }

    /**
     * Creates object with information about customer.
     */
    getCustomerObject(): {
        name: string | null;
        email: string | null;
        phone: string | null;
        externalId: string | null;
    } {
        const customerName = this.getDataAttribute(config.chat.attributes.customerName);
        const customerEmail = this.getDataAttribute(config.chat.attributes.customerEmail);
        const customerPhone = this.getDataAttribute(config.chat.attributes.customerPhone);
        const customerExternalId = this.getDataAttribute(config.chat.attributes.customerExternalId);

        return { name: customerName, email: customerEmail, phone: customerPhone, externalId: customerExternalId };
    }

    /**
     * Creates information about bot and user (operator).
     */
    getBotDto(): BotDto {
        const botDto = new BotDto();

        const avatarUserUrl = this.getDataAttribute(config.chat.attributes.avatarUserUrl);
        const avatarUserBase64 = this.getDataAttribute(config.chat.attributes.avatarUserBase64);

        if (avatarUserUrl) {
            botDto.setUserAvatarUrl(avatarUserUrl);
        } else if (avatarUserBase64) {
            botDto.setUserAvatarBase64(avatarUserBase64);
        }

        const avatarBotUrl = this.getDataAttribute(config.chat.attributes.avatarBotUrl);
        const avatarBotBase64 = this.getDataAttribute(config.chat.attributes.avatarBotBase64);

        if (avatarBotUrl) {
            botDto.setBotAvatarUrl(avatarBotUrl);
        } else if (avatarBotBase64) {
            botDto.setBotAvatarBase64(avatarBotBase64);
        }

        return botDto;
    }

    /**
     * Creates information about popover.
     */
    getPopoverDto(): PopoverDto {
        const label = this.getDataAttribute(config.popover.attributes.label) ?? undefined;
        const buttonLabel = this.getDataAttribute(config.popover.attributes.buttonLabel) ?? undefined;
        const delay = parseInt(this.getDataAttribute(config.popover.attributes.delay) as string);

        return new PopoverDto(label, buttonLabel, delay);
    }
}
