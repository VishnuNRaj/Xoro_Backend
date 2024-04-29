"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../controllers/routes/user"));
const admin_1 = __importDefault(require("./../../controllers/routes/admin"));
const post_1 = __importDefault(require("./../../controllers/routes/post"));
const profile_1 = __importDefault(require("./../../controllers/routes/profile"));
const RouterConfig = (app) => {
    app.use('/user', user_1.default);
    app.use('/admin', admin_1.default);
    app.use('/post', post_1.default);
    app.use('/profile', profile_1.default);
};
exports.default = RouterConfig;
