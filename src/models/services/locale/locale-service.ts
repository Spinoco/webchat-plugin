export class LocaleService {
    private readonly locale: string;

    constructor() {
        this.locale = this.detect();
    }

    private detect(): string {
        if (navigator.languages && navigator.languages.length) {
            return navigator.languages[0];
        } else {
            return navigator.language || "en";
        }
    }

    public getLocale(): string {
        return this.locale;
    }
}
