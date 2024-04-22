"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoryStorage = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({});
const memory = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
exports.memoryStorage = (0, multer_1.default)({ storage: memory });
exports.default = upload;
