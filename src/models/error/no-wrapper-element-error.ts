import { ApplicationError } from "./application-error";

export class NoWrapperElementError extends ApplicationError {
    constructor(id: string) {
        super(`No wrapper element with id "${id}" found.`);
        Object.setPrototypeOf(this, NoWrapperElementError.prototype);
    }
}
