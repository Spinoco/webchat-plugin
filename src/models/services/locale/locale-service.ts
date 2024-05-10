import { config } from "../../../config/config";
import { ChatDomService } from "../dom/chat-dom-service";

export class LocaleService {
    public readonly locale: string;

    constructor(domService: ChatDomService) {
        this.locale = this.detect(domService);
    }

    /**
     * Detect language from browser or use a default.
     */
    private detect(domService: ChatDomService): string {
        const custom = domService.getLocale();

        if (custom) {
            return custom;
        } else if (navigator.languages && navigator.languages.length) {
            return navigator.languages[0];
        } else {
            return navigator.language || config.chat.defaultLanguage;
        }
    }
}
