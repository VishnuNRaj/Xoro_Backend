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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProfile = exports.SearchUser = exports.UnFollowUser = exports.FollowUser = exports.EditProfile = exports.ProfileSettings = exports.SecureAccount = exports.EditProfilePic = exports.EditBanner = void 0;
const UseCases = __importStar(require("../../applications/usecases/UserProfile"));
const EditBanner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = req.result;
        const Image = req.file;
        const data = yield UseCases.EditBanner({ Image, user: result === null || result === void 0 ? void 0 : result.user });
        return res.status(data.status).json(data);
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.EditBanner = EditBanner;
const EditProfilePic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = req.result;
        const Image = req.file;
        const data = yield UseCases.EditProfilePic({ Image, user: result === null || result === void 0 ? void 0 : result.user });
        return res.status(data.status).json(data);
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.EditProfilePic = EditProfilePic;
const SecureAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = req.result;
        const { Password } = req.body;
        const data = yield UseCases.SecureAccount({ user: result === null || result === void 0 ? void 0 : result.user, Password });
        return res.status(data.status).json(data);
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.SecureAccount = SecureAccount;
const ProfileSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = req.result;
        const { Notification, Private, ProfileLock } = req.body;
        const data = yield UseCases.ProfileSettings({ user: result === null || result === void 0 ? void 0 : result.user, Notification, Private, ProfileLock });
        return res.status(data.status).json(data);
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.ProfileSettings = ProfileSettings;
const EditProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = req.result;
        const { Name, Username, Gender, Age, Country, Description } = req.body;
        const data = yield UseCases.EditProfile({ user: result === null || result === void 0 ? void 0 : result.user, Name, Username, Gender, Age, Country, Description });
        return res.status(data.status).json(data);
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.EditProfile = EditProfile;
const FollowUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = req.result;
        const { UserId } = req.params;
        const data = yield UseCases.FollowUser({ user: result === null || result === void 0 ? void 0 : result.user, UserId });
        return res.status(data.status).json(data);
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.FollowUser = FollowUser;
const UnFollowUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = req.result;
        const { UserId } = req.params;
        const data = yield UseCases.UnFollowUser({ user: result === null || result === void 0 ? void 0 : result.user, UserId });
        return res.status(data.status).json(data);
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.UnFollowUser = UnFollowUser;
const SearchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = req.result;
        const { Search } = req.params;
        const data = yield UseCases.SearchUser({ user: result === null || result === void 0 ? void 0 : result.user, Search });
        return res.status(data.status).json(data);
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.SearchUser = SearchUser;
const GetProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = req.result;
        const { Profilelink } = req.params;
        const data = yield UseCases.GetUserProfile({ user: result === null || result === void 0 ? void 0 : result.user, Profilelink });
        return res.status(data.status).json(data);
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.GetProfile = GetProfile;
