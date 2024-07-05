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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTwoStep = exports.getTwoStep = exports.ResendOTP = exports.verifyUserAuthRepository = exports.OTPVerifyRepository = exports.AddProfilePicRepository = exports.VerifyAccountRepository = exports.LoginRepository = exports.RegisterRepository = void 0;
const DatabaseFunctions = __importStar(require("../../functions/DatabaseFunctions"));
const UnverifiedUsers_1 = __importDefault(require("../../../frameworks/database/models/UnverifiedUsers"));
const ResponseFunctions = __importStar(require("../../responses/UserResponse"));
const CommonFunctions = __importStar(require("../../functions/CommonFunctions"));
const SendMail_1 = require("../../functions/SendMail");
const JWT_1 = require("../../functions/JWT");
const User_1 = __importDefault(require("../../../frameworks/database/models/User"));
const auth_1 = __importDefault(require("../../../config/auth"));
const UserFunctions_1 = require("../../functions/UserFunctions");
const Connetions_1 = __importDefault(require("../../../frameworks/database/models/Connetions"));
const Notifications_1 = __importDefault(require("../../../frameworks/database/models/Notifications"));
// import { Notification } from '../../../entities/ModelsInterface/Notification';
// import { ObjectId } from 'mongodb';
const RegisterRepository = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Name, Email, Phone, Type, Profile } = data;
        let { Password } = data;
        const user = yield DatabaseFunctions.findOneData(UnverifiedUsers_1.default, { Email: Email });
        if (user && user.Verified) {
            return ResponseFunctions.SignupRes({
                errors: [],
                status: 202,
                message: 'User Already Exists'
            });
        }
        const LinkTimeout = CommonFunctions.CalculateTime(2);
        const VerificationLink = CommonFunctions.generateVerificationLink();
        const link = `${auth_1.default.baseLink}/${auth_1.default.verifyAccount}/${VerificationLink}/`;
        if (user && !user.Verified) {
            yield DatabaseFunctions.updateById(UnverifiedUsers_1.default, user._id, { VerificationLink: VerificationLink, LinkTimeout: LinkTimeout });
            yield (0, SendMail_1.SendVerificationLink)(Email, link + user._id);
            return ResponseFunctions.SignupRes({
                errors: [],
                message: 'Already Logged Account Please Verify Account Through Link Shared Via Email',
                status: 200
            });
        }
        const Username = CommonFunctions.generateRandomName('user', 8);
        Password = yield CommonFunctions.HashPassword(Password);
        const [Userdata] = yield DatabaseFunctions.insertData(UnverifiedUsers_1.default, { Name, Email, Password, Phone, Username, VerificationLink, LinkTimeout, Profile, Type });
        yield (0, SendMail_1.SendVerificationLink)(Email, link + Userdata._id);
        return ResponseFunctions.SignupRes({
            errors: [],
            message: 'A Verification Link Has Been Shared to Your Email',
            status: 200
        });
    }
    catch (e) {
        console.log(e);
        return ResponseFunctions.SignupRes({
            errors: [],
            message: 'Internal Server Error',
            status: 500
        });
    }
});
exports.RegisterRepository = RegisterRepository;
const LoginRepository = (_a) => __awaiter(void 0, [_a], void 0, function* ({ Email, Password, Type }) {
    try {
        const user = yield DatabaseFunctions.findOneData(UnverifiedUsers_1.default, { Email: Email });
        const userauth = yield (0, UserFunctions_1.VerifyUser)(user);
        if (user && user.Type !== Type) {
            return ResponseFunctions.VerityAccountAuthRes({
                message: "Account Loggin Incorrect",
                status: 202,
                user: null
            });
        }
        if (!userauth.status) {
            return ResponseFunctions.VerityAccountAuthRes({
                message: userauth.message,
                status: 202,
                user: null
            });
        }
        if (!(yield CommonFunctions.ComparePassword(Password, user.Password))) {
            return ResponseFunctions.VerityAccountAuthRes({
                message: 'Incorrect Password',
                status: 202,
                user: null
            });
        }
        let VerificationLink = '';
        if (user && !user.Verified) {
            VerificationLink = CommonFunctions.generateVerificationLink();
            const link = `${auth_1.default.baseLink}/${auth_1.default.verifyAccount}/${VerificationLink}/`;
            const LinkTimeout = CommonFunctions.CalculateTime(2);
            yield DatabaseFunctions.updateById(UnverifiedUsers_1.default, user._id, { VerificationLink: VerificationLink, LinkTimeout: LinkTimeout });
            yield (0, SendMail_1.SendVerificationLink)(Email, link + user._id);
            return ResponseFunctions.LoginRes({
                errors: [],
                message: 'Account Not Yet Verified. Please Verify Account Through Link Shared Via Email',
                status: 204
            });
        }
        if (!user.TwoStepVerification) {
            const token = yield (0, JWT_1.CreatePayload)({ Payload: { UserId: user._id, Email: user.Email, Admin: false }, RememberMe: false });
            const refresh = yield (0, JWT_1.CreatePayload)({ Payload: { UserId: user._id, Email: user.Email, Admin: false }, RememberMe: true });
            return ResponseFunctions.LoginRes({
                message: token,
                status: 210,
                errors: [],
                refresh: refresh,
                user: yield DatabaseFunctions.findUsingId(User_1.default, user._id)
            });
        }
        VerificationLink = CommonFunctions.OTPgenerate();
        yield (0, SendMail_1.SendVerificationOTP)(Email, VerificationLink);
        const LinkTimeout = CommonFunctions.CalculateTime(2);
        yield DatabaseFunctions.updateById(UnverifiedUsers_1.default, user._id, { VerificationLink: VerificationLink, LinkTimeout: LinkTimeout });
        return ResponseFunctions.LoginRes({
            errors: [],
            message: 'A Otp Has Been Send To The Registered Email Address',
            status: 200,
            user: user
        });
    }
    catch (e) {
        return ResponseFunctions.SignupRes({
            errors: [],
            message: 'Internal Server Error',
            status: 500
        });
    }
});
exports.LoginRepository = LoginRepository;
const VerifyAccountRepository = (_b) => __awaiter(void 0, [_b], void 0, function* ({ VerificationLink, UserId }) {
    try {
        const result = yield DatabaseFunctions.checkObjectId(UserId);
        console.log(result);
        if (!result) {
            return ResponseFunctions.VerifyAccountRes({
                message: 'Invalid Link',
                status: 202
            });
        }
        const user = yield DatabaseFunctions.findUsingId(UnverifiedUsers_1.default, { _id: UserId });
        console.log(user);
        if (!user || user.Suspended || user.Terminated || user.VerificationLink != VerificationLink || user.Verified) {
            return ResponseFunctions.VerifyAccountRes({
                message: 'Invalid Link',
                status: 202
            });
        }
        const currentDate = new Date();
        if (user.LinkTimeout < currentDate) {
            return ResponseFunctions.VerifyAccountRes({
                message: 'Link Expired',
                status: 203
            });
        }
        yield DatabaseFunctions.updateById(UnverifiedUsers_1.default, user._id, { Verified: true });
        const ProfileLink = yield CommonFunctions.generateVerificationLink();
        const [res] = yield Promise.all([
            yield DatabaseFunctions.insertData(Connetions_1.default, { UserId: user._id }),
            yield DatabaseFunctions.insertData(Notifications_1.default, {
                UserId: user._id, Messages: [
                    {
                        Message: 'Welcome to Xoro Streams',
                        SenderId: user._id,
                        Link: '',
                        Type: 'Auth'
                    }
                ]
            }),
        ]);
        yield DatabaseFunctions.insertData(User_1.default, {
            _id: user._id,
            Name: user.Name,
            Username: user.Username,
            Suspended: user.Suspended,
            SuspendedTill: user.SuspendedTill,
            Connections: res[0]._id,
            ProfileLink: ProfileLink,
            Profile: user.Profile,
        });
        const token = yield (0, JWT_1.CreatePayload)({ Payload: { UserId: user._id, Email: user.Email, Admin: false }, RememberMe: false });
        return ResponseFunctions.VerifyAccountRes({
            message: 'Verified Succesfully',
            status: 200,
            token: token,
            user: user,
            refresh: token,
            data: {
                Message: 'Welcome to Xoro Streams',
                Type: 'Auth',
                SenderId: '',
                Link: '',
            }
        });
    }
    catch (e) {
        console.log(e);
        return ResponseFunctions.VerifyAccountRes({
            message: 'Internal Server Error',
            status: 500
        });
    }
});
exports.VerifyAccountRepository = VerifyAccountRepository;
const AddProfilePicRepository = (_c, _d, _e) => __awaiter(void 0, [_c, _d, _e], void 0, function* ({ file }, { Username, RememberMe }, { UserId }) {
    try {
        let result = DatabaseFunctions.checkObjectId(UserId);
        if (!result) {
            return ResponseFunctions.AddProfileRes({
                message: 'Invalid Link',
                status: 202
            });
        }
        let user = yield DatabaseFunctions.findUsingId(UnverifiedUsers_1.default, UserId);
        if (!user) {
            return ResponseFunctions.AddProfileRes({
                message: 'Invalid Link',
                status: 202,
                token: ''
            });
        }
        const dataFound = yield DatabaseFunctions.findOneData(UnverifiedUsers_1.default, {
            Username: Username,
            Email: { $ne: user.Email }
        });
        if (dataFound) {
            return ResponseFunctions.AddProfileRes({
                message: 'Username Already Exists',
                status: 202,
                token: ''
            });
        }
        user.Username = Username ? Username : user.Username;
        user.Profile = typeof file == 'string' && file != '' ? file : user.Profile;
        yield DatabaseFunctions.saveData(user);
        yield DatabaseFunctions.updateById(User_1.default, UserId, { Profile: user.Profile, Username: user.Username });
        const token = yield (0, JWT_1.CreatePayload)({ Payload: { UserId: user._id, Email: user.Email, Admin: false }, RememberMe: false });
        const refresh = RememberMe ? yield (0, JWT_1.CreatePayload)({ Payload: { UserId: user._id, Email: user.Email, Admin: false }, RememberMe }) : token;
        return ResponseFunctions.AddProfileRes({
            message: 'Uploaded Successfully',
            status: 200,
            token: token,
            user: user,
            refresh: refresh
        });
    }
    catch (e) {
        console.log(e);
        return ResponseFunctions.AddProfileRes({
            message: 'Internal Server Error',
            status: 202,
            token: ''
        });
    }
});
exports.AddProfilePicRepository = AddProfilePicRepository;
const OTPVerifyRepository = (_f, _g) => __awaiter(void 0, [_f, _g], void 0, function* ({ OTP, RememberMe }, { UserId }) {
    try {
        const check = DatabaseFunctions.checkObjectId(UserId);
        if (!check) {
            console.log('3');
            return ResponseFunctions.OTPVerifyRes({
                message: 'Invalid Link',
                status: 202,
                token: '',
            });
        }
        const user = yield DatabaseFunctions.findUsingId(UnverifiedUsers_1.default, UserId);
        const auth = yield (0, UserFunctions_1.VerifyUser)(user);
        if (!auth.status) {
            return ResponseFunctions.VerityAccountAuthRes({
                message: auth.message,
                status: 202,
                user: null
            });
        }
        if (user.VerificationLink != OTP.toString()) {
            console.log(user.VerificationLink, OTP.toString());
            return ResponseFunctions.OTPVerifyRes({
                message: 'Invalid OTP',
                status: 202,
                token: ''
            });
        }
        const currentDate = new Date();
        if (user.LinkTimeout < currentDate) {
            return ResponseFunctions.OTPVerifyRes({
                message: 'Link Expired',
                status: 202,
                token: ''
            });
        }
        const token = yield (0, JWT_1.CreatePayload)({ Payload: { UserId: user._id, Email: user.Email, Admin: false }, RememberMe: false });
        const refresh = RememberMe ? yield (0, JWT_1.CreatePayload)({ Payload: { UserId: user._id, Email: user.Email, Admin: false }, RememberMe }) : token;
        return ResponseFunctions.OTPVerifyRes({
            message: 'Verified Succesfully',
            status: 200,
            token: token,
            user: user,
            refresh: refresh
        });
    }
    catch (e) {
        console.log(e);
        return ResponseFunctions.OTPVerifyRes({
            message: 'Internal Server Error',
            status: 500,
            token: ''
        });
    }
});
exports.OTPVerifyRepository = OTPVerifyRepository;
const verifyUserAuthRepository = (token, refresh) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, JWT_1.VerifyPayload)({ token, refresh });
        if (!result.status) {
            return ResponseFunctions.VerityAccountAuthRes({
                message: result.error,
                status: 202,
                user: null
            });
        }
        if (result.Admin) {
            return ResponseFunctions.VerityAccountAuthRes({
                message: 'Invalid Credentials Found',
                status: 202,
                user: null
            });
        }
        let user = yield DatabaseFunctions.findUsingId(User_1.default, result.user.UserId);
        const auth = yield (0, UserFunctions_1.VerifyUser)(user);
        if (!auth.status) {
            return ResponseFunctions.VerityAccountAuthRes({
                message: auth.message,
                status: 202,
                user: null
            });
        }
        console.log(user);
        return ResponseFunctions.VerityAccountAuthRes({
            message: 'Verified Succesfully',
            status: 200,
            user: user,
            token: result.token
        });
    }
    catch (e) {
        console.log(e);
        return ResponseFunctions.VerityAccountAuthRes({
            message: 'Internal Server Error',
            status: 500,
            user: null
        });
    }
});
exports.verifyUserAuthRepository = verifyUserAuthRepository;
const ResendOTP = (_h) => __awaiter(void 0, [_h], void 0, function* ({ UserId }) {
    try {
        const result = yield DatabaseFunctions.checkObjectId(UserId);
        if (!result) {
            return ResponseFunctions.ResendOTPRes({
                message: 'Invalid Link',
                status: 202
            });
        }
        const user = yield DatabaseFunctions.findUsingId(UnverifiedUsers_1.default, UserId);
        const auth = yield (0, UserFunctions_1.VerifyUser)(user);
        if (!auth.status) {
            return ResponseFunctions.VerityAccountAuthRes({
                message: auth.message,
                status: 202,
                user: null
            });
        }
        const VerificationLink = CommonFunctions.OTPgenerate();
        yield (0, SendMail_1.SendVerificationOTP)(user.Email, VerificationLink);
        const LinkTimeout = CommonFunctions.CalculateTime(2);
        yield DatabaseFunctions.updateById(UnverifiedUsers_1.default, user._id, { VerificationLink: VerificationLink, LinkTimeout: LinkTimeout });
        return ResponseFunctions.ResendOTPRes({
            message: 'OTP Has Been Send to Registered Email',
            status: 200,
            token: ''
        });
    }
    catch (e) {
        console.log(e);
        return ResponseFunctions.ResendOTPRes({
            message: 'Internal Server Error',
            status: 500
        });
    }
});
exports.ResendOTP = ResendOTP;
const getTwoStep = (_j) => __awaiter(void 0, [_j], void 0, function* ({ user }) {
    try {
        const { TwoStepVerification } = yield DatabaseFunctions.findUsingId(UnverifiedUsers_1.default, user._id);
        return ResponseFunctions.GetSecurityRes({
            message: 'Security Verified',
            status: 200,
            user: user,
            TwoStepVerification: TwoStepVerification
        });
    }
    catch (e) {
        return ResponseFunctions.GetSecurityRes({
            message: 'Internal Server Error',
            status: 500,
            user: user,
            TwoStepVerification: false
        });
    }
});
exports.getTwoStep = getTwoStep;
const setTwoStep = (_k) => __awaiter(void 0, [_k], void 0, function* ({ user }) {
    try {
        const userData = yield DatabaseFunctions.findUsingId(UnverifiedUsers_1.default, user);
        userData.TwoStepVerification = !userData.TwoStepVerification;
        yield DatabaseFunctions.saveData(userData);
        return ResponseFunctions.setTwoStepRes({
            message: 'Security Verified',
            status: 200,
        });
    }
    catch (e) {
        return ResponseFunctions.setTwoStepRes({
            message: 'Internal Server Error',
            status: 500,
        });
    }
});
exports.setTwoStep = setTwoStep;
