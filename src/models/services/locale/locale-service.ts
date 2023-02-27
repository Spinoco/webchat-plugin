import { config } from "../../../config/config";

export class LocaleService {
    public readonly locale: string;

    constructor() {
        this.locale = this.detect();
    }

    /**
     * Detect language from browser or use a default.
     */
    private detect(): string {
        if (navigator.languages && navigator.languages.length) {
            return navigator.languages[0];
        } else {
            return navigator.language || config.chat.defaultLanguage;
        }
    }
}
