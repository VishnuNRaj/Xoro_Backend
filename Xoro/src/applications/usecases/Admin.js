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
exports.addCategory = exports.ManageUser = exports.getUsers = exports.VerifyAdmin = exports.ResendAdminOTP = exports.AdminOTPVerify = exports.AdminLogin = void 0;
const Validations = __importStar(require("../validations/UserValidation"));
const Repository = __importStar(require("../repository/Admin/AdminAuthRepository"));
const AdminUserRepository = __importStar(require("../repository/Admin/AdminUserManagementRepository"));
const DatabaseFunctions_1 = require("../functions/DatabaseFunctions");
const AdminLogin = (_a) => __awaiter(void 0, [_a], void 0, function* ({ Email, Password }) {
    try {
        const errors = yield Validations.LoginValidate({ Email, Password });
        if (errors.length > 0) {
            return {
                errors, message: 'Invalid Data Format', status: 201
            };
        }
        return yield Repository.AdminLoginRepository({ Email, Password });
    }
    catch (e) {
        console.log(e);
        return {
            message: 'Internal server error',
            errors: [],
            status: 500
        };
    }
});
exports.AdminLogin = AdminLogin;
const AdminOTPVerify = (_b) => __awaiter(void 0, [_b], void 0, function* ({ OTP, RememberMe, UserId }) {
    try {
        if (!OTP || isNaN(parseInt(OTP)) || OTP.length !== 6) {
            return {
                message: 'Invalid OTP',
                status: 202
            };
        }
        if (!UserId || RememberMe === undefined) {
            return {
                message: 'Invalid Link',
                status: 202
            };
        }
        return yield Repository.AdminOTPVerifyRepository({ OTP, RememberMe, UserId });
    }
    catch (e) {
        return {
            message: 'Internal server error',
            status: 500
        };
    }
});
exports.AdminOTPVerify = AdminOTPVerify;
const ResendAdminOTP = (_c) => __awaiter(void 0, [_c], void 0, function* ({ UserId }) {
    try {
        return yield Repository.ResendOTPRepository({ UserId });
    }
    catch (e) {
        return {
            message: 'Internal server error',
            status: 500
        };
    }
});
exports.ResendAdminOTP = ResendAdminOTP;
const VerifyAdmin = (_d) => __awaiter(void 0, [_d], void 0, function* ({ token }) {
    try {
        if (!token || typeof token !== 'string') {
            return {
                message: 'Invalid Credentials',
                status: 202
            };
        }
        return yield Repository.VerifyAdminRepository({ token });
    }
    catch (e) {
        return {
            message: 'Internal Server Error',
            status: 500
        };
    }
});
exports.VerifyAdmin = VerifyAdmin;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield AdminUserRepository.UserDataRepository();
    }
    catch (e) {
        return {
            users: null,
            message: 'Internal Server Error',
            status: 500
        };
    }
});
exports.getUsers = getUsers;
const ManageUser = (_e) => __awaiter(void 0, [_e], void 0, function* ({ UserId, Admin, Suspended, SuspendedTill, Terminate }) {
    try {
        const result = yield (0, DatabaseFunctions_1.checkObjectId)(UserId);
        if (!result) {
            return {
                message: 'Invalid Credentials',
                status: 203
            };
        }
        if (SuspendedTill && isNaN(SuspendedTill)) {
            return {
                message: 'Invalid Data Format',
                status: 203
            };
        }
        return yield AdminUserRepository.UserManagementRepository({ UserId, Admin, Suspended, SuspendedTill, Terminate });
    }
    catch (e) {
        return {
            message: 'Internal Server Error',
            status: 500
        };
    }
});
exports.ManageUser = ManageUser;
const addCategory = (_f) => __awaiter(void 0, [_f], void 0, function* ({}) {
    try {
    }
    catch (e) {
    }
});
exports.addCategory = addCategory;
