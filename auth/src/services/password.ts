import bcrypt from 'bcryptjs'
//import { scrypt, randomBytes } from 'crypto'
//import { promisify } from 'util'

//const scryptAsync = promisify(scrypt)

export class Password {
    static async toHash(password: string){
        //const salt = randomBytes(8).toString('hex')
        //const buf = (await scryptAsync(password, salt, 64)) as Buffer
        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        return hashedPassword
        //return `${buf.toString('hex')}.${salt}`
    }

    static async compare(storedPassword: string, suppliedPassword: string){
        //const [hashedPassword, salt] = storedPassword.split('.')
        //const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer

        //return Buffer.toString('hex') === hashedPassword
        return await bcrypt.compare(suppliedPassword, storedPassword)
    }
}