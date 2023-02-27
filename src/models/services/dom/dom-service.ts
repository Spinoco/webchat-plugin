import { NoWrapperElementError } from "../../error/no-wrapper-element-error";
import { DataAttributeNotFoundError } from "../../error/data-attribute-not-found-error";

export class DomService {
    public readonly id: string;

    public readonly wrapperElement: HTMLElement;

    constructor(id: string) {
        this.id = id;

        // find wrapper element
        const wrapperElement = document.getElementById(this.id);
        if (!wrapperElement) {
            throw new NoWrapperElementError(this.id);
        }

        this.wrapperElement = wrapperElement;
    }

    getRequiredDataAttribute(name: string): string {
        const value = this.wrapperElement.getAttribute(name);
        if (!value) {
            throw new DataAttributeNotFoundError(name);
        }
        return value;
    }

    getDataAttribute(name: string): string | null {
        return this.wrapperElement.getAttribute(name);
    }
}
