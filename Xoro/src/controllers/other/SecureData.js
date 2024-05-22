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
exports.verifyPayloadSecure = exports.createPayloadSecure = void 0;
const auth_1 = __importDefault(require("../../config/auth"));
const encodeString = (data) => {
    return new TextEncoder().encode(data);
};
const createPayloadSecure = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const encodedData = encodeString(JSON.stringify(data));
    const encodedSecret = encodeString(auth_1.default.JWT_SECRET);
    try {
        const key = yield crypto.subtle.importKey('raw', encodedSecret, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
        const signature = yield crypto.subtle.sign('HMAC', key, encodedData);
        return signature;
    }
    catch (error) {
        console.error('Error creating payload:', error);
        return null;
    }
});
exports.createPayloadSecure = createPayloadSecure;
const verifyPayloadSecure = (data, signature) => __awaiter(void 0, void 0, void 0, function* () {
    const encodedData = encodeString(JSON.stringify(data));
    const encodedSecret = encodeString(auth_1.default.JWT_SECRET);
    try {
        const key = yield crypto.subtle.importKey('raw', encodedSecret, { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
        const verified = yield crypto.subtle.verify('HMAC', key, signature, encodedData);
        return verified ? data : null;
    }
    catch (error) {
        console.error('Error verifying payload:', error);
        return null;
    }
});
exports.verifyPayloadSecure = verifyPayloadSecure;
