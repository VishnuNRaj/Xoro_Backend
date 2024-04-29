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
const profileRouter = (0, express_1.Router)();
const Middleware = __importStar(require("../middlewares/UserController"));
const Middleware2 = __importStar(require("../middlewares/UserController2"));
const Multer_1 = __importDefault(require("../other/Multer"));
profileRouter.post('/edit-banner', Multer_1.default.single('Image'), Middleware.VerifyUserAuth, Middleware2.EditBanner);
profileRouter.post('/edit-profile-pic', Multer_1.default.single('Image'), Middleware.VerifyUserAuth, Middleware2.EditProfilePic);
profileRouter.post('/edit-profile', Middleware.VerifyUserAuth, Middleware2.EditProfile);
profileRouter.post('/secure-account', Middleware.VerifyUserAuth, Middleware2.SecureAccount);
profileRouter.post('/profile-settings', Middleware.VerifyUserAuth, Middleware2.ProfileSettings);
profileRouter.post('/follow/:UserId', Middleware.VerifyUserAuth, Middleware2.FollowUser);
profileRouter.post('/unfollow/:UserId', Middleware.VerifyUserAuth, Middleware2.UnFollowUser);
exports.default = profileRouter;
