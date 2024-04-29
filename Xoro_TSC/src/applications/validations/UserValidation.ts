import Joi from 'joi';
import * as UserEntities from '../../controllers/interfaces/UserInterfaces';
import { log } from 'console';

export const RegisterValidate: Function = async (data: UserEntities.Register) => {
    try {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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

export const ImageValidate: Function = async ({filename,mimetype}: Express.Multer.File) => {
    try {
        const imageSchema = Joi.object({
            filename: Joi.string().required(),
            mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif').required(),
        });

        const { error } = imageSchema.validate({filename,mimetype});

        if (error) {
            return { status: false, message: error.details[0].message };
        }

        return { status: true, message: 'Image Validated successfully' };
    } catch (e) {
        console.error(e);
        return { status: false, message: 'Internal Server Error' };
    }
};

export const CountryValidate: Function = async (data: string) => {
    try {
        const countryList = [
            'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
            'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia',
            'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
            'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo (Congo-Brazzaville)',
            'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czechia (Czech Republic)', 'Democratic Republic of the Congo', 'Denmark', 'Djibouti',
            'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini (fmr. "Swaziland")',
            'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea',
            'Guinea-Bissau', 'Guyana', 'Haiti', 'Holy See', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel',
            'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho',
            'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands',
            'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar (formerly Burma)',
            'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia (formerly Macedonia)', 'Norway',
            'Oman', 'Pakistan', 'Palau', 'Palestine State', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania',
            'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia',
            'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan',
            'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago',
            'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States of America', 'Uruguay', 'Uzbekistan', 'Vanuatu',
            'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
        ];
        const countrySchema = Joi.string().valid(...countryList).insensitive().trim().required();
        const { error } = countrySchema.validate(data);
        if (error) {
            return { status: false, message: error.details[0].message }
        }
        return { status: true, message: 'Country Valid' };
    } catch (e) {
        console.log(e)
        return { status: false, message: 'Internal Server Error' }
    }
}

export const EditProfileValidate: Function = async (data: UserEntities.EditProfileData) => {
    try {
        const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
        const nameRegex = /^[a-zA-Z\s]+$/;
        const schema = Joi.object({
            Name: Joi.string().regex(nameRegex).required(),
            Username: Joi.string().regex(usernameRegex).required(),
            Gender: Joi.string().valid('Male', 'Female', 'Other', 'Not Provided').required(),
            Age: Joi.number().integer().min(10).optional(),
            Description: Joi.array().items(Joi.string()).optional()
        });
        const { error } = schema.validate(data);
        if (error) {
            return { status: false, message: error.details[0].message };
        }

        return { status: true, message: 'Validation successful' };
    } catch (e) {
        console.error(e);
        return { status: false, message: 'Internal Server Error' };
    }
};

export const ProfileSettingsValidate: Function = async (data: UserEntities.ProfileSettings) => {
    try {
        const schema = Joi.object({
            Private: Joi.boolean().required(),
            Notification: Joi.boolean().required(),
            ProfileLock: Joi.boolean().required()
        });
        const { error } = schema.validate(data);
        if (error) {
            return { status: false, message: error.details[0].message };
        }
        return { status: true, message: 'Validation successful' };
    } catch (e) {
        return { status: false, message: 'Internal Server Error' }
    }
}