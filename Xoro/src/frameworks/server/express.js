"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const helmet_1 = __importDefault(require("helmet"));
const cors_2 = __importDefault(require("../../config/cors"));
const expressConfig = (app) => {
    app.use(express_1.default.json({ limit: '10mb' }));
    app.use(express_1.default.urlencoded({ limit: '100mb', extended: true }));
    app.use((0, morgan_1.default)('dev'));
    app.use((0, helmet_1.default)({ xssFilter: true }));
    app.use((0, express_mongo_sanitize_1.default)());
    app.use((0, cookie_parser_1.default)());
    app.use((0, cors_1.default)(cors_2.default));
};
exports.default = expressConfig;
