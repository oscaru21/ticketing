import express, {Request, Response} from 'express'
import { body, validationResult } from 'express-validator'
import { getEffectiveTypeParameterDeclarations } from 'typescript'
import { BadRequestError } from '../errors/BadRequestError'
import { DatabaseConnectionError } from '../errors/database-connection-error'
import { RequestValidationError } from '../errors/request-validation-error'
import { User } from '../models/user'

const router = express.Router()

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters')
], 
async (req: Request, res: Response) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
       throw new RequestValidationError(errors.array())
    }

    const { email, password } = req.body

    const existingEmail = await User.findOne({email})

    if(existingEmail){
       throw new BadRequestError('Email in use')
    }

    const user = User.build({email, password})
    await user.save()

    res.status(201).send(user)
})

export { router as signupRouter}