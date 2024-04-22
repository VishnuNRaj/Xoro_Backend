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
exports.VerifyPayload = exports.CreatePayload = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../../config/auth"));
const CreatePayload = ({ Payload, RememberMe }) => {
    try {
        const { JWT_EXPIRES_IN, JWT_REMEMBER_ME, JWT_SECRET } = auth_1.default;
        return jsonwebtoken_1.default.sign(Payload, JWT_SECRET, { expiresIn: RememberMe ? JWT_REMEMBER_ME : JWT_EXPIRES_IN });
    }
    catch (e) {
        console.log(e);
        return 'Internal server error';
    }
};
exports.CreatePayload = CreatePayload;
const VerifyPayload = (_a) => __awaiter(void 0, [_a], void 0, function* ({ token }) {
    try {
        const { JWT_SECRET } = auth_1.default;
        const decodedToken = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        console.log(decodedToken);
        return {
            status: true,
            user: decodedToken,
            error: null
        };
    }
    catch (error) {
        console.log(error);
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            return {
                status: false,
                user: null,
                error: 'Session Expired'
            };
        }
        else {
            return {
                status: false,
                user: null,
                error: 'Internal server error'
            };
        }
    }
});
exports.VerifyPayload = VerifyPayload;
