"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../controllers/routes/user"));
const admin_1 = __importDefault(require("./../../controllers/routes/admin"));
const post_1 = __importDefault(require("./../../controllers/routes/post"));
const profile_1 = __importDefault(require("./../../controllers/routes/profile"));
const search_1 = __importDefault(require("./../../controllers/routes/search"));
const video_1 = __importDefault(require("./../../controllers/routes/video"));
const chat_1 = __importDefault(require("./../../controllers/routes/chat"));
const live_1 = __importDefault(require("./../../controllers/routes/live"));
const comment_1 = __importDefault(require("./../../controllers/routes/comment"));
const RouterConfig = (app) => {
    app.use('/user', user_1.default);
    app.use('/admin', admin_1.default);
    app.use('/post', post_1.default);
    app.use('/profile', profile_1.default);
    app.use('/search', search_1.default);
    app.use('/video', video_1.default);
    app.use('/chat', chat_1.default);
    app.use('/live', live_1.default);
    app.use('/comment', comment_1.default);
};
exports.default = RouterConfig;
