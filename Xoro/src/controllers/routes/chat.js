"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatRouter = (0, express_1.Router)();
chatRouter.route('/chat/:UserId');
exports.default = chatRouter;
