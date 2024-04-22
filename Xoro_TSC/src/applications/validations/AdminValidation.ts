import * as AdminEntity from '../../controllers/interfaces/AdminInterface'
import Joi from 'joi'
export const LoginValidate: Function = async (data: AdminEntity.AdminLogin) => {
    try {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const errors = [
            'Invalid Email Address',
            'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
        ]
        const schema = Joi.object<AdminEntity.AdminLogin>({
            Email: Joi.string().email().required().error(new Error('0')),
            Password: Joi.string().pattern(passwordRegex).required().error(new Error('1'))
        })
        const { error } = schema.validate(data, { abortEarly: false })
        if (error) {
            const errMessage: string[] = new Array(2).fill('')
            const i: number = parseInt(error.message)
            errMessage[i] = errors[i]
            return errMessage
        }
        return []
    } catch (e) {
        return ['Validation Error']
    }
}