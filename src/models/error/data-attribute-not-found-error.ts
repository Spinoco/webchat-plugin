import { ApplicationError } from "./application-error";

export class DataAttributeNotFoundError extends ApplicationError {
    constructor(name: string) {
        super(`Data attribute "${name}" not found in wrapper element.`);
        Object.setPrototypeOf(this, DataAttributeNotFoundError.prototype);
    }
}
