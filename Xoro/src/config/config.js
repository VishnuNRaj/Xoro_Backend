"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    PORT: parseInt(process.env.PORT || '3000'),
    MONGO: process.env.MONGO || '',
    BASE: process.env.BASE || ''
};
exports.default = config;
