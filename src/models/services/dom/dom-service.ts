import { NoWrapperElementError } from "../../error/no-wrapper-element-error";
import { DataAttributeNotFoundError } from "../../error/data-attribute-not-found-error";

export class DomService {
    public readonly wrapperElement: HTMLElement;

    constructor(htmlId: string) {
        const wrapperElement = document.getElementById(htmlId);
        if (!wrapperElement) {
            throw new NoWrapperElementError(htmlId);
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

    /**
     * Gets reference to the window object that is used by the chat.
     * This is resolved via the wrapper element.
     */
    getWindow(): Window {
        return this.wrapperElement.ownerDocument.defaultView || window;
    }
}
