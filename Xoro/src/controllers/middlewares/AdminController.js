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
exports.ManageUsers = exports.getUsers = exports.verifyAccountResponse = exports.VerifyAdminAuth = exports.ResendOTP = exports.AdminVerifyOTP = exports.AdminLogin = void 0;
const UseCases = __importStar(require("../../applications/usecases/Admin"));
const console_1 = require("console");
const AdminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, Password, } = req.body;
        (0, console_1.log)(req.body);
        const result = yield UseCases.AdminLogin({ Email, Password });
        res.status(result.status).json(result);
    }
    catch (e) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.AdminLogin = AdminLogin;
const AdminVerifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { UserId, OTP, RememberMe } = req.body;
        const result = yield UseCases.AdminOTPVerify({ UserId, OTP, RememberMe });
        return res.status(result.status).json(result);
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.AdminVerifyOTP = AdminVerifyOTP;
const ResendOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { UserId } = req.body;
        const result = yield UseCases.ResendAdminOTP({ UserId });
        return res.status(result.status).json(result);
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.ResendOTP = ResendOTP;
const VerifyAdminAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.admin;
        const result = yield UseCases.VerifyAdmin({ token });
        console.log(result, token);
        req.result = result;
        if (result.status === 200) {
            req.result = result;
            return next();
        }
        else
            return res.status(result.status).json(result);
    }
    catch (e) {
        return res.status(500).json({ status: true });
    }
});
exports.VerifyAdminAuth = VerifyAdminAuth;
const verifyAccountResponse = (req, res) => {
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
exports.verifyAccountResponse = verifyAccountResponse;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = req.result;
        const data = yield UseCases.getUsers();
        return res.status(data.status).json({ users: data.users, admin: result === null || result === void 0 ? void 0 : result.admin, status: data.status, message: data.message });
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getUsers = getUsers;
const ManageUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Admin, Terminate, Suspended, SuspendedTill } = req.body;
        const { UserId } = req.params;
        console.log(req.body, UserId);
        const result = yield UseCases.ManageUser({ UserId, Admin, Terminate, Suspended, SuspendedTill });
        return res.status(result.status).json(result);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.ManageUsers = ManageUsers;
