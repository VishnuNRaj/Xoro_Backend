"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatRouter = (0, express_1.Router)();
const ChatController_1 = __importDefault(require("../middlewares/ChatController"));
const Chat_1 = __importDefault(require("../../applications/usecases/Chat"));
const Usecase = new Chat_1.default();
const Middleware = (0, ChatController_1.default)(Usecase);
const UserController_1 = require("../middlewares/UserController");
chatRouter.route('/').get(UserController_1.VerifyUserAuth, Middleware.getChats).post(UserController_1.VerifyUserAuth, Middleware.StartChat);
chatRouter.get("/:RoomId", UserController_1.VerifyUserAuth, Middleware.getChat);
exports.default = chatRouter;
