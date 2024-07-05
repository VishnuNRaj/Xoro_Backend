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
const UserController_1 = require("../middlewares/UserController");
const Middleware = __importStar(require("../middlewares/ProfileController"));
const Multer_1 = __importDefault(require("../other/Multer"));
profileRouter.post('/edit-banner', Multer_1.default.single('Image'), UserController_1.VerifyUserAuth, Middleware.EditBanner);
profileRouter.post('/edit-profile-pic', Multer_1.default.single('Image'), UserController_1.VerifyUserAuth, Middleware.EditProfilePic);
profileRouter.post('/edit-profile', UserController_1.VerifyUserAuth, Middleware.EditProfile);
profileRouter.post('/secure-account', UserController_1.VerifyUserAuth, Middleware.SecureAccount);
profileRouter.post('/profile-settings', UserController_1.VerifyUserAuth, Middleware.ProfileSettings);
profileRouter.post('/follow/:UserId', UserController_1.VerifyUserAuth, Middleware.FollowUser);
profileRouter.post('/remove/:UserId', UserController_1.VerifyUserAuth, Middleware.RemoveFollowUser);
profileRouter.post('/unfollow/:UserId', UserController_1.VerifyUserAuth, Middleware.UnFollowUser);
profileRouter.get('/search/:Search', UserController_1.VerifyUserAuth, Middleware.SearchUser);
profileRouter.get('/:ProfileLink', UserController_1.VerifyUserAuth, Middleware.GetProfile);
profileRouter.post('/createChannel', Multer_1.default.single('Logo'), UserController_1.VerifyUserAuth, Middleware.CreateChannel);
exports.default = profileRouter;
