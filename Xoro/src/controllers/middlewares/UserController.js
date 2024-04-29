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
exports.getSecurity = exports.ResendOTP = exports.VerifyUserResponse = exports.VerifyUserAuth = exports.OtpVerify = exports.AddProfile = exports.VerifyAccount = exports.Login = exports.Register = void 0;
const UseCases = __importStar(require("../../applications/usecases/User"));
const console_1 = require("console");
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Name, Email, Password, Phone, } = req.body;
        const result = yield UseCases.RegisterUser({ Name, Email, Password, Phone });
        (0, console_1.log)(result);
        res.status(result.status).json(result);
    }
    catch (e) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.Register = Register;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, Password } = req.body;
        const result = yield UseCases.LoginUser({ Email, Password });
        console.log(result);
        res.status(result.status).json(result);
    }
    catch (e) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.Login = Login;
const VerifyAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { VerificationLink, UserId } = req.params;
        console.log(req.params);
        const result = yield UseCases.VerifyUser({ VerificationLink, UserId });
        res.status(result.status).json(result);
    }
    catch (e) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.VerifyAccount = VerifyAccount;
const AddProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file ? req.file : req.body.Profile;
        const { Username, RememberMe } = req.body;
        const { UserId } = req.params;
        const result = yield UseCases.AddProfileUser({ file }, { Username, RememberMe }, { UserId });
        res.status(result.status).json(result);
    }
    catch (e) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.AddProfile = AddProfile;
const OtpVerify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { UserId } = req.params;
        const { OTP, RememberMe } = req.body;
        console.log(OTP);
        const result = yield UseCases.OTPVerifyLogin({ OTP, RememberMe }, { UserId });
        res.status(result.status).json(result);
    }
    catch (e) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.OtpVerify = OtpVerify;
const VerifyUserAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.file, req.files);
        const token = req.headers.authorization;
        const result = yield UseCases.verifyUserAuth(token);
        if (result.status === 200) {
            req.result = result;
            return next();
        }
        return res.status(result.status).json(result);
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.VerifyUserAuth = VerifyUserAuth;
const VerifyUserResponse = (req, res) => {
    try {
        const result = req.result;
        if (result) {
            return res.status(result.status).json(result);
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.VerifyUserResponse = VerifyUserResponse;
const ResendOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { UserId } = req.body;
        const result = yield UseCases.ResendUserOTP({ UserId });
        return res.status(result.status).json(result);
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.ResendOTP = ResendOTP;
const getSecurity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = req.result;
        const data = yield UseCases.getTwoStep({ user: result === null || result === void 0 ? void 0 : result.user });
        return res.status(data.status).json(data);
    }
    catch (e) {
        return res.status(500).json({ messsage: 'Internal Server Error' });
    }
});
exports.getSecurity = getSecurity;
