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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../middlewares/UserController");
const Middleware = __importStar(require("./../middlewares/PostController"));
const Multer_1 = __importDefault(require("../other/Multer"));
const postRouter = (0, express_1.Router)();
postRouter.get('/', UserController_1.VerifyUserAuth, Middleware.ShowPostImages);
postRouter.get('/:skip', UserController_1.VerifyUserAuth, Middleware.GetPosts);
postRouter.post('/add-post', Multer_1.default.array('Media'), UserController_1.VerifyUserAuth, Middleware.PostImages);
postRouter.get('/delete/:PostId', UserController_1.VerifyUserAuth, Middleware.DeletePost);
postRouter.patch('/like/:PostId', UserController_1.VerifyUserAuth, Middleware.LikePost);
postRouter.patch('/dislike/:PostId', UserController_1.VerifyUserAuth, Middleware.DislikePost);
postRouter.patch('/remove/:PostId', UserController_1.VerifyUserAuth, Middleware.RemoveReactions);
exports.default = postRouter;
