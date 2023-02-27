export class ApplicationError extends Error {
    constructor(message: string) {
        super(`SWP: ${message}`);
        Object.setPrototypeOf(this, ApplicationError.prototype);
    }
}
