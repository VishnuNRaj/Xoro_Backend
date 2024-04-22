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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserManagementRes = exports.AdminUserDataRes = exports.AdminVerifyAuthRes = exports.AdminResendOTPRes = exports.AdminOTPVerifyRes = exports.AdminLoginRes = void 0;
const AdminLoginRes = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        message: data.message,
        errors: data.errors,
        status: data.status,
        admin: data.admin
    };
});
exports.AdminLoginRes = AdminLoginRes;
const AdminOTPVerifyRes = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        message: data.message,
        admin: data.admin,
        status: data.status,
        token: data.token
    };
});
exports.AdminOTPVerifyRes = AdminOTPVerifyRes;
const AdminResendOTPRes = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        message: data.message,
        status: data.status
    };
});
exports.AdminResendOTPRes = AdminResendOTPRes;
const AdminVerifyAuthRes = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        message: data.message,
        status: data.status,
        admin: data.admin,
    };
});
exports.AdminVerifyAuthRes = AdminVerifyAuthRes;
const AdminUserDataRes = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        message: data.message,
        status: data.status,
        users: data.users
    };
});
exports.AdminUserDataRes = AdminUserDataRes;
const AdminUserManagementRes = (data) => {
    return {
        status: data.status,
        message: data.message
    };
};
exports.AdminUserManagementRes = AdminUserManagementRes;
