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
     * used to register callback for hash url change.
     * This allows to handle activites passed on as hash url in the browser.
     * @param callback  Function to invoke when the hash activity has been recognized.
     *                  The function take a string as a parameter that contains parameters from the hash url
     */
    registerHashCallback(callback: (a: string[]) => void): void {
        const w = this.wrapperElement.ownerDocument.defaultView || window;
        w.addEventListener("hashchange", () => {
            const hash = window.location.hash;
            if (hash.startsWith("#sp-webchat")) {
                w.location.hash = "";
                const params = hash.slice(10).split(";");
                callback(params.filter((command) => command.trim().length > 0));
            }
            return;
        });
        return;
    }
}
