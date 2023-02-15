export class DomService {
    public readonly id: string;

    public readonly wrapperElement: HTMLElement;

    constructor(id: string) {
        this.id = id;

        // find wrapper element
        const wrapperElement = document.getElementById(this.id);
        if (!wrapperElement) {
            throw new Error('Spinoco webchat plugin: No div with "spinoco-webchat-plugin" id found.');
        }

        this.wrapperElement = wrapperElement;
    }

    getRequiredDataAttribute(name: string): string {
        const value = this.wrapperElement.getAttribute(name);
        if (!value) {
            throw new Error(`Spinoco webchat plugin: Data attribute ${name} not found!`);
        }
        return value;
    }

    getDataAttribute(name: string): string | null {
        return this.wrapperElement.getAttribute(name);
    }
}
