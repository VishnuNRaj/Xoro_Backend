"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTwoStep = exports.getTwoStep = exports.ResendUserOTP = exports.verifyUserAuth = exports.OTPVerifyLogin = exports.AddProfileUser = exports.VerifyUser = exports.LoginUser = exports.RegisterUser = void 0;
const Validations = __importStar(require("../validations/UserValidation"));
const ResponseFunctions = __importStar(require("../responses/UserResponse"));
const Repository = __importStar(require("../repository/User/UserAuthRepository"));
const UserFunctions = __importStar(require("../functions/UserFunctions"));
const console_1 = require("console");
const RegisterUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ Name, Email, Password, Phone, Type, Profile }) {
    try {
        let errors = [];
        if (Type === 'Email') {
            errors = yield Validations.RegisterValidate({ Name, Email, Password, Phone, Type });
        }
        if (errors.length > 0) {
            return ResponseFunctions.SignupRes({
                errors: errors,
                status: 201,
                message: 'Invalid Data Provided'
            });
        }
        return yield Repository.RegisterRepository({ Name, Email, Password, Phone, Type, Profile });
    }
    catch (e) {
        return {
            errors: [],
            message: 'Internal Server Error 1',
            status: 500
        };
    }
});
exports.RegisterUser = RegisterUser;
const LoginUser = (_b) => __awaiter(void 0, [_b], void 0, function* ({ Email, Password, Type }) {
    try {
        let errors = [];
        if (Type === 'Email') {
            errors = yield Validations.LoginValidate({ Email, Password });
        }
        if (errors.length > 0) {
            return {
                errors, message: 'Invalid Data Format', status: 201
            };
        }
        return yield Repository.LoginRepository({ Email, Password, Type });
    }
    catch (e) {
        return {
            errors: [],
            message: 'Internal Server Error',
            status: 500
        };
    }
});
exports.LoginUser = LoginUser;
const VerifyUser = (_c) => __awaiter(void 0, [_c], void 0, function* ({ VerificationLink, UserId }) {
    try {
        (0, console_1.log)(VerificationLink, UserId);
        if (!VerificationLink) {
            return {
                message: 'No Link Found',
                status: 201
            };
        }
        if (!UserId) {
            return {
                message: 'No Link Found',
                status: 201
            };
        }
        return yield Repository.VerifyAccountRepository({ VerificationLink, UserId });
    }
    catch (e) {
        return {
            message: 'Internal Server Error',
            status: 500
        };
    }
});
exports.VerifyUser = VerifyUser;
const AddProfileUser = (_d, _e, _f) => __awaiter(void 0, [_d, _e, _f], void 0, function* ({ file }, { Username, RememberMe }, { UserId }) {
    try {
        if (!UserId) {
            return {
                message: 'Internal Server Error',
                status: 202,
                token: ''
            };
        }
        console.log(typeof file);
        if (typeof file !== 'string') {
            if (!file || !file.mimetype && file.mimetype.startsWith('image/')) {
                return {
                    message: 'Please Upload Image Files',
                    status: 202,
                    token: ''
                };
            }
        }
        const result = typeof file !== 'string' ? yield UserFunctions.UploadFile(file) : file;
        if (!result) {
            return {
                message: 'Internal Server Error',
                status: 202,
                token: ''
            };
        }
        return Repository.AddProfilePicRepository({ file: result }, { Username, RememberMe }, { UserId });
    }
    catch (e) {
        return {
            message: 'Internal Server Error',
            status: 500,
            token: ''
        };
    }
});
exports.AddProfileUser = AddProfileUser;
const OTPVerifyLogin = (_g, _h) => __awaiter(void 0, [_g, _h], void 0, function* ({ OTP, RememberMe }, { UserId }) {
    try {
        console.log(OTP, typeof OTP);
        if (!OTP || isNaN(OTP) || OTP.toString().length !== 6) {
            console.log('1');
            return {
                message: 'Invalid OTP',
                status: 202,
                token: ''
            };
        }
        if (!UserId) {
            console.log('2');
            return {
                message: 'Invalid Link',
                status: 202,
                token: ''
            };
        }
        return yield Repository.OTPVerifyRepository({ OTP, RememberMe }, { UserId });
    }
    catch (e) {
        return {
            message: 'Internal Server Error',
            status: 500,
            token: ''
        };
    }
});
exports.OTPVerifyLogin = OTPVerifyLogin;
const verifyUserAuth = (token, refresh) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!token || typeof token !== 'string' || typeof refresh !== 'string') {
            return {
                message: 'Invalid Credentials',
                status: 202,
                user: null
            };
        }
        return yield Repository.verifyUserAuthRepository(token, refresh);
    }
    catch (e) {
        console.error(e);
        return {
            message: 'Internal Server Error',
            status: 500,
            user: null
        };
    }
});
exports.verifyUserAuth = verifyUserAuth;
const ResendUserOTP = (_j) => __awaiter(void 0, [_j], void 0, function* ({ UserId }) {
    try {
        return yield Repository.ResendOTP({ UserId });
    }
    catch (e) {
        console.log(e);
        return {
            message: 'Internal Server Error',
            status: 500,
            token: ''
        };
    }
});
exports.ResendUserOTP = ResendUserOTP;
const getTwoStep = (_k) => __awaiter(void 0, [_k], void 0, function* ({ user }) {
    try {
        return Repository.getTwoStep({ user });
    }
    catch (e) {
        return {
            message: 'Internal Server Error',
            status: 500,
            user: user,
            TwoStepVerification: false
        };
    }
});
exports.getTwoStep = getTwoStep;
const setTwoStep = (_l) => __awaiter(void 0, [_l], void 0, function* ({ user }) {
    try {
        return Repository.setTwoStep({ user });
    }
    catch (e) {
        return {
            message: 'Internal Server Error',
            status: 500,
        };
    }
});
exports.setTwoStep = setTwoStep;
