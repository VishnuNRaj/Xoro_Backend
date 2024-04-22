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
exports.LoginValidate = exports.RegisterValidate = void 0;
const joi_1 = __importDefault(require("joi"));
const console_1 = require("console");
const RegisterValidate = (data) => __awaiter(void 0, void 0, void 0, function* () {
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
        ];
        const schema = joi_1.default.object({
            Name: joi_1.default.string().pattern(nameRegex).required().error(new Error('0')),
            Email: joi_1.default.string().email().required().error(new Error('1')),
            Password: joi_1.default.string()
                .pattern(passwordRegex)
                .required()
                .error(new Error('2')),
            Phone: joi_1.default.string().length(10).allow('').optional().error(new Error('4')),
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
