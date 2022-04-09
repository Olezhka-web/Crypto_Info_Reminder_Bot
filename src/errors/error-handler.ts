export class ErrorHandler extends Error {
    status: number;
    message: string;

    constructor(status: number, msg: string) {
        super(msg);
        this.message = msg;
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    }
}
