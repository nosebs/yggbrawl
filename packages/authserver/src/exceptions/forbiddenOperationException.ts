
export const INVALID_USERNAME_PASSWORD = `Invalid credentials. Invalid username or password.`;
export class ForbiddenOperationException extends Error {

    errorMessage: string;
    cause?: Error;

    constructor(errorMessage: string, cause?: Error) {
        super(`${errorMessage} ${cause ? cause?.message : ""}`)
        this.errorMessage = errorMessage;
        this.cause = cause;
    }
}