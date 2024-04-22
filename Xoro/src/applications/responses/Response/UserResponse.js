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
exports.ResendOTPRes = exports.VerityAccountAuthRes = exports.OTPVerifyRes = exports.AddProfileRes = exports.VerifyAccountRes = exports.LoginRes = exports.SignupRes = void 0;
const SignupRes = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        errors: data.errors,
        message: data.message,
        status: data.status
    };
});
exports.SignupRes = SignupRes;
const LoginRes = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        errors: data.errors,
        message: data.message,
        status: data.status,
        user: data.user || null
    };
});
exports.LoginRes = LoginRes;
const VerifyAccountRes = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        message: data.message,
        status: data.status,
        token: data.token,
        user: data.user
    };
});
exports.VerifyAccountRes = VerifyAccountRes;
const AddProfileRes = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        message: data.message,
        status: data.status,
        token: data.token,
        user: data.user
    };
});
exports.AddProfileRes = AddProfileRes;
const OTPVerifyRes = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        message: data.message,
        token: data.token,
        user: data.user,
        status: data.status
    };
});
exports.OTPVerifyRes = OTPVerifyRes;
const VerityAccountAuthRes = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        message: data.message,
        user: data.user,
        status: data.status
    };
});
exports.VerityAccountAuthRes = VerityAccountAuthRes;
const ResendOTPRes = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        message: data.message,
        status: data.status
    };
});
exports.ResendOTPRes = ResendOTPRes;
