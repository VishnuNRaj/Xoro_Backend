import Joi from 'joi';
import * as UserEntities from '../../controllers/interfaces/UserInterfaces';
import { log } from 'console';

export const RegisterValidate: Function = async (data: UserEntities.Register) => {
    try {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        // const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
        const nameRegex = /^[a-zA-Z\s]+$/;
        const errors = [
            'Name is required and should not contain numbers',
            'Invalid email format',
            'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
            'Username must be alphanumeric and between 3 to 30 characters',
            'Phone number must be exactly 10 digits long'
        ]
        const schema = Joi.object<UserEntities.Register>({
            Name: Joi.string().pattern(nameRegex).required().error(new Error('0')),
            Email: Joi.string().email().required().error(new Error('1')),
            Password: Joi.string()
                .pattern(passwordRegex)
                .required()
                .error(new Error('2')),
            Phone: Joi.string().length(10).allow('').optional().error(new Error('4')),
        });

        const { error } = schema.validate(data, { abortEarly: false });
        log(error)
        if (error) {
            let errMessage: string[] = new Array(5).fill('')
            const i: number = parseInt(error.message)
            errMessage[i] = errors[i]
            return errMessage
        }

        return [];
    } catch (e) {
        console.log(e);
        return ['Validation error'];
    }
};

export const LoginValidate: Function = async (data: UserEntities.Login) => {
    try {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const errors = [
            'Invalid Email Address',
            'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
        ]
        const schema = Joi.object<UserEntities.Login>({
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
