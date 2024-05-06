"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileSettingsValidate = exports.EditProfileValidate = exports.CountryValidate = exports.ImageValidate = exports.LoginValidate = exports.RegisterValidate = void 0;
const joi_1 = __importDefault(require("joi"));
const console_1 = require("console");
const RegisterValidate = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const nameRegex = /^[a-zA-Z\s]+$/;
        const errors = [
            'Name is required and should not contain numbers',
            'Invalid email format',
            'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
            'Username must be alphanumeric and between 3 to 30 characters',
            'Phone number must be exactly 10 digits long'
        ];
        const schema = joi_1.default.object({
            Name: joi_1.default.string().pattern(nameRegex).required().error(new Error('0')),
            Email: joi_1.default.string().email().required().error(new Error('1')),
            Password: joi_1.default.string()
                .pattern(passwordRegex)
                .required()
                .error(new Error('2')),
            Phone: joi_1.default.string().length(10).allow('').optional().error(new Error('4')),
            Type: joi_1.default.string().valid('Email', 'LinkedIn', 'Google').required().error(new Error('5'))
        });
        const { error } = schema.validate(data, { abortEarly: false });
        (0, console_1.log)(error);
        if (error) {
            let errMessage = new Array(5).fill('');
            const i = parseInt(error.message);
            errMessage[i] = errors[i];
            return errMessage;
        }
        return [];
    }
    catch (e) {
        console.log(e);
        return ['Validation error'];
    }
});
exports.RegisterValidate = RegisterValidate;
const LoginValidate = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const errors = [
            'Invalid Email Address',
            'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
        ];
        const schema = joi_1.default.object({
            Email: joi_1.default.string().email().required().error(new Error('0')),
            Password: joi_1.default.string().pattern(passwordRegex).required().error(new Error('1'))
        });
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            const errMessage = new Array(2).fill('');
            const i = parseInt(error.message);
            errMessage[i] = errors[i];
            return errMessage;
        }
        return [];
    }
    catch (e) {
        return ['Validation Error'];
    }
});
exports.LoginValidate = LoginValidate;
const ImageValidate = (_a) => __awaiter(void 0, [_a], void 0, function* ({ filename, mimetype }) {
    try {
        const imageSchema = joi_1.default.object({
            filename: joi_1.default.string().required(),
            mimetype: joi_1.default.string().valid('image/jpeg', 'image/png', 'image/gif').required(),
        });
        const { error } = imageSchema.validate({ filename, mimetype });
        if (error) {
            return { status: false, message: error.details[0].message };
        }
        return { status: true, message: 'Image Validated successfully' };
    }
    catch (e) {
        console.error(e);
        return { status: false, message: 'Internal Server Error' };
    }
});
exports.ImageValidate = ImageValidate;
const CountryValidate = (data) => __awaiter(void 0, void 0, void 0, function* () {
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
        const countrySchema = joi_1.default.string().valid(...countryList).insensitive().trim().required();
        const { error } = countrySchema.validate(data);
        if (error) {
            return { status: false, message: error.details[0].message };
        }
        return { status: true, message: 'Country Valid' };
    }
    catch (e) {
        console.log(e);
        return { status: false, message: 'Internal Server Error' };
    }
});
exports.CountryValidate = CountryValidate;
const EditProfileValidate = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
        const nameRegex = /^[a-zA-Z\s]+$/;
        const schema = joi_1.default.object({
            Name: joi_1.default.string().regex(nameRegex).required(),
            Username: joi_1.default.string().regex(usernameRegex).required(),
            Gender: joi_1.default.string().valid('Male', 'Female', 'Other', 'Not Provided').required(),
            Age: joi_1.default.number().integer().min(10).optional(),
            Description: joi_1.default.array().items(joi_1.default.string()).optional()
        });
        const { error } = schema.validate(data);
        if (error) {
            return { status: false, message: error.details[0].message };
        }
        return { status: true, message: 'Validation successful' };
    }
    catch (e) {
        console.error(e);
        return { status: false, message: 'Internal Server Error' };
    }
});
exports.EditProfileValidate = EditProfileValidate;
const ProfileSettingsValidate = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = joi_1.default.object({
            Private: joi_1.default.boolean().required(),
            Notification: joi_1.default.boolean().required(),
            ProfileLock: joi_1.default.boolean().required()
        });
        const { error } = schema.validate(data);
        if (error) {
            return { status: false, message: error.details[0].message };
        }
        return { status: true, message: 'Validation successful' };
    }
    catch (e) {
        return { status: false, message: 'Internal Server Error' };
    }
});
exports.ProfileSettingsValidate = ProfileSettingsValidate;
