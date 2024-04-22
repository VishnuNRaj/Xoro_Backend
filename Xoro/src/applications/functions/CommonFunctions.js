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
exports.OTPgenerate = exports.ComparePassword = exports.CalculateTime = exports.HashPassword = exports.generateVerificationLink = exports.generateRandomName = void 0;
const bcryptjs_1 = require("bcryptjs");
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
function generateRandomName(prefix, randomStringLength) {
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
    const randomString = generateRandomString(randomStringLength);
    return `${prefix}${randomNumber}${randomString}`;
}
exports.generateRandomName = generateRandomName;
function generateVerificationLink() {
    const VerificationToken = generateRandomString(32);
    return VerificationToken;
}
exports.generateVerificationLink = generateVerificationLink;
const HashPassword = (Password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, bcryptjs_1.hash)(Password, 10);
});
exports.HashPassword = HashPassword;
const CalculateTime = (time) => {
    const currentDate = new Date();
    return new Date(currentDate.getTime() + (time * 60000));
};
exports.CalculateTime = CalculateTime;
const ComparePassword = (Password, Hashed) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, bcryptjs_1.compare)(Password, Hashed);
});
exports.ComparePassword = ComparePassword;
const OTPgenerate = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
};
exports.OTPgenerate = OTPgenerate;
