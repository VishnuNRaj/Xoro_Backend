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
exports.VerifyAdminRepository = exports.ResendOTPRepository = exports.AdminOTPVerifyRepository = exports.AdminLoginRepository = void 0;
const DatabaseFunctions = __importStar(require("../../functions/DatabaseFunctions"));
const ResponseFunctions = __importStar(require("../../responses/AdminResponse"));
const CommonFunctions = __importStar(require("../../functions/CommonFunctions"));
const SendMail_1 = require("../../functions/SendMail");
const JWT_1 = require("../../functions/JWT");
const Admin_1 = __importDefault(require("../../../frameworks/database/models/Admin"));
const AdminLoginRepository = (_a) => __awaiter(void 0, [_a], void 0, function* ({ Email, Password }) {
    try {
        const admin = yield DatabaseFunctions.findOneData(Admin_1.default, { Email: Email });
        if (!admin) {
            return ResponseFunctions.AdminLoginRes({
                errors: [],
                message: 'No Account Detected',
                status: 202
            });
        }
        if (!(yield CommonFunctions.ComparePassword(Password, admin.Password))) {
            return ResponseFunctions.AdminLoginRes({
                errors: [],
                message: 'Incorrect Password',
                status: 202
            });
        }
        const VerificationLink = CommonFunctions.OTPgenerate();
        yield (0, SendMail_1.SendVerificationOTP)(Email, VerificationLink);
        const LinkTimeout = CommonFunctions.CalculateTime(2);
        yield DatabaseFunctions.updateById(Admin_1.default, admin._id, { VerificationLink: VerificationLink, LinkTimeout: LinkTimeout });
        return ResponseFunctions.AdminLoginRes({
            errors: [],
            message: 'A Otp Has Been Send To The Registered Email Address',
            status: 200,
            admin: admin
        });
    }
    catch (e) {
        console.log(e);
        return ResponseFunctions.AdminLoginRes({
            errors: [],
            message: 'Internal Server Error',
            status: 500
        });
    }
});
exports.AdminLoginRepository = AdminLoginRepository;
const AdminOTPVerifyRepository = (_b) => __awaiter(void 0, [_b], void 0, function* ({ OTP, UserId, RememberMe }) {
    try {
        const result = yield DatabaseFunctions.checkObjectId(UserId);
        if (!result) {
            return ResponseFunctions.AdminOTPVerifyRes({
                message: 'Invalid Link',
                status: 202
            });
        }
        const admin = yield DatabaseFunctions.findOneData(Admin_1.default, { _id: UserId });
        if (!admin) {
            return ResponseFunctions.AdminOTPVerifyRes({
                message: 'Invalid Link',
                status: 202
            });
        }
        const currentDate = new Date();
        if (OTP !== admin.VerificationLink) {
            return ResponseFunctions.AdminOTPVerifyRes({
                message: 'Invalid OTP',
                status: 202
            });
        }
        if (currentDate > new Date(admin.LinkTimeout)) {
            return ResponseFunctions.AdminOTPVerifyRes({
                message: 'OTP Expired',
                status: 203
            });
        }
        return ResponseFunctions.AdminOTPVerifyRes({
            message: 'OTP Verified',
            admin: admin,
            status: 200,
            token: yield (0, JWT_1.CreatePayload)({
                Payload: {
                    UserId: admin._id,
                    Email: admin.Email,
                    Admin: true
                }, RememberMe: RememberMe
            })
        });
    }
    catch (e) {
        console.log(e);
        return ResponseFunctions.AdminOTPVerifyRes({
            errors: [],
            message: 'Internal Server Error',
            status: 500
        });
    }
});
exports.AdminOTPVerifyRepository = AdminOTPVerifyRepository;
const ResendOTPRepository = (_c) => __awaiter(void 0, [_c], void 0, function* ({ UserId }) {
    try {
        const result = yield DatabaseFunctions.checkObjectId(UserId);
        if (!result) {
            return ResponseFunctions.AdminResendOTPRes({
                message: 'Invalid Link',
                status: 202
            });
        }
        const admin = yield DatabaseFunctions.findUsingId(Admin_1.default, UserId);
        if (!admin) {
            return ResponseFunctions.AdminResendOTPRes({
                message: 'Invalid Link',
                status: 202
            });
        }
        const VerificationLink = CommonFunctions.OTPgenerate();
        yield (0, SendMail_1.SendVerificationOTP)(admin.Email, VerificationLink);
        const LinkTimeout = CommonFunctions.CalculateTime(2);
        yield DatabaseFunctions.updateById(Admin_1.default, admin._id, { VerificationLink: VerificationLink, LinkTimeout: LinkTimeout });
        return ResponseFunctions.AdminResendOTPRes({
            message: 'A Otp Has Been Send To The Registered Email Address',
            status: 200
        });
    }
    catch (e) {
        console.log(e);
        return ResponseFunctions.AdminResendOTPRes({
            message: 'Internal Server Error',
            status: 500
        });
    }
});
exports.ResendOTPRepository = ResendOTPRepository;
const VerifyAdminRepository = (_d) => __awaiter(void 0, [_d], void 0, function* ({ token }) {
    try {
        console.log(token);
        const result = yield (0, JWT_1.VerifyPayload)({ token });
        console.log(result);
        if (!result.status) {
            return ResponseFunctions.AdminVerifyAuthRes({
                message: result.error,
                status: 202
            });
        }
        if (!result.user.Admin) {
            return ResponseFunctions.AdminVerifyAuthRes({
                message: 'Invalid Credentials',
                status: 202
            });
        }
        const admin = yield DatabaseFunctions.findUsingId(Admin_1.default, result.user.UserId);
        console.log(admin);
        if (!admin) {
            return ResponseFunctions.AdminVerifyAuthRes({
                message: 'No User Found',
                status: 202
            });
        }
        return ResponseFunctions.AdminVerifyAuthRes({
            message: 'Verified SucessFully',
            status: 200,
            admin: admin
        });
    }
    catch (e) {
        return {
            message: 'Internal Server Error',
            status: 500
        };
    }
});
exports.VerifyAdminRepository = VerifyAdminRepository;
