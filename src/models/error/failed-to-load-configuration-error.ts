import { ApplicationError } from "./application-error";

export class FailedToLoadConfigurationError extends ApplicationError {
    constructor(message: string) {
        super(`Failed to load configuration: ${message}`);
        Object.setPrototypeOf(this, FailedToLoadConfigurationError.prototype);
    }
}
