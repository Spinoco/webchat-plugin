import { ApplicationError } from "./application-error";

export class NoWrapperElementError extends ApplicationError {
    constructor(htmlId: string) {
        super(`No wrapper element with id "${htmlId}" found.`);
        Object.setPrototypeOf(this, NoWrapperElementError.prototype);
    }
}
