import { CustomError } from './custom-error'

export class DatabaseConnectionError extends CustomError{
    statusCode = 500
    reason = 'Failed to connect to DB'
    
    constructor(){
        super('Failed to connect to DB')

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors(){
        return [{message: this.reason}]
    }
}