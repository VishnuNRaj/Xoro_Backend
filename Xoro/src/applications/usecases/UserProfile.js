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
exports.CreateChannel = exports.GetUserProfile = exports.UnFollowUser = exports.FollowUser = exports.SearchUser = exports.ProfileSettings = exports.SecureAccount = exports.EditProfile = exports.EditProfilePic = exports.EditBanner = void 0;
const Validations = __importStar(require("../validations/UserValidation"));
const ResponseFunctions = __importStar(require("../responses/Response/UserResponse"));
const Repository = __importStar(require("../repository/User/UserProfileRepository"));
const firebase_1 = require("../../config/firebase");
const EditBanner = (_a) => __awaiter(void 0, [_a], void 0, function* ({ user, Image }) {
    try {
        if (!Image) {
            return ResponseFunctions.EditBannerRes({
                message: 'No Image Provided',
                status: 201
            });
        }
        const result = yield Validations.ImageValidate(Image);
        if (!result.status) {
            return ResponseFunctions.EditBannerRes({
                message: result.message,
                status: 201
            });
        }
        return Repository.editBannerRepository({ user, Image });
    }
    catch (e) {
        return {
            message: 'Internal Server Error',
            status: 500,
            user: user
        };
    }
});
exports.EditBanner = EditBanner;
const EditProfilePic = (_b) => __awaiter(void 0, [_b], void 0, function* ({ user, Image }) {
    try {
        if (!Image) {
            return ResponseFunctions.EditBannerRes({
                message: 'No Image Provided',
                status: 201
            });
        }
        const result = yield Validations.ImageValidate(Image);
        if (!result.status) {
            return ResponseFunctions.EditBannerRes({
                message: result.message,
                status: 201
            });
        }
        return Repository.editProfilePicRepository({ user, Image });
    }
    catch (e) {
        return {
            message: 'Internal Server Error',
            status: 500,
            user: user
        };
    }
});
exports.EditProfilePic = EditProfilePic;
const EditProfile = (_c) => __awaiter(void 0, [_c], void 0, function* ({ user, Description, Name, Username }) {
    try {
        // const result = await Validations.EditProfileValidate({ Description, Name, Username });
        // if (!result.status) {
        //     return <Responses.EditProfileDataResponse>{
        //         message: result.message,
        //         status: 201,
        //         user: user
        //     }
        // }
        return Repository.EditProfileData({ user, Description, Name, Username });
    }
    catch (e) {
        console.log(e);
        return {
            message: 'Internal Server Error',
            status: 500,
            user: user
        };
    }
});
exports.EditProfile = EditProfile;
const SecureAccount = (_d) => __awaiter(void 0, [_d], void 0, function* ({ user, Password }) {
    try {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(Password)) {
            return {
                message: 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character',
                status: 201,
                user: user
            };
        }
        return Repository.SecureAccountRepository({ user, Password });
    }
    catch (e) {
        console.log(e);
        return {
            message: 'Internal Server Error',
            status: 500,
            user: user
        };
    }
});
exports.SecureAccount = SecureAccount;
const ProfileSettings = (_e) => __awaiter(void 0, [_e], void 0, function* ({ user, Notification, Private, ProfileLock }) {
    try {
        const result = yield Validations.ProfileSettingsValidate({ Notification, Private, ProfileLock });
        if (!result.status) {
            return {
                message: result.message,
                status: 201,
                user: user
            };
        }
        return Repository.ProfileSettingsRepository({ user, Notification, Private, ProfileLock });
    }
    catch (e) {
        console.log(e);
        return {
            message: 'Internal Server Error',
            status: 500,
            user: user
        };
    }
});
exports.ProfileSettings = ProfileSettings;
const SearchUser = (_f) => __awaiter(void 0, [_f], void 0, function* ({ user, Search }) {
    try {
        console.log(Search);
        if (!Search || typeof Search !== 'string' || Search.length === 0) {
            return ResponseFunctions.SearchUserRes({
                message: 'Invalid Search',
                status: 201,
                user: user,
                users: null,
            });
        }
        return Repository.SearchUserRepository({ user, Search });
    }
    catch (e) {
        console.log(e);
        return {
            message: 'Internal Server Error',
            status: 500,
            user: user,
            users: null
        };
    }
});
exports.SearchUser = SearchUser;
const FollowUser = (_g) => __awaiter(void 0, [_g], void 0, function* ({ user, UserId }) {
    try {
        if (!UserId || typeof UserId !== 'string' || UserId.length === 0) {
            return {
                message: 'Invalid Credentials',
                status: 201,
                user: user
            };
        }
        return Repository.FollowUserRepository({ user, UserId });
    }
    catch (e) {
        console.log(e);
        return {
            message: 'Internal Server Error',
            status: 500,
            user: user
        };
    }
});
exports.FollowUser = FollowUser;
const UnFollowUser = (_h) => __awaiter(void 0, [_h], void 0, function* ({ user, UserId }) {
    try {
        if (!UserId || typeof UserId !== 'string' || UserId.length === 0) {
            return {
                message: 'Invalid Credentials',
                status: 201,
                user: user
            };
        }
        return Repository.UnFollowUserRepository({ user, UserId });
    }
    catch (e) {
        console.log(e);
        return {
            message: 'Internal Server Error',
            status: 500,
            user: user
        };
    }
});
exports.UnFollowUser = UnFollowUser;
const GetUserProfile = (_j) => __awaiter(void 0, [_j], void 0, function* ({ user, ProfileLink }) {
    try {
        console.log(ProfileLink);
        if (!ProfileLink || ProfileLink.length === 0) {
            return {
                message: 'Invalid Credentials',
                status: 201,
                user: user,
                userData: null,
                post: {
                    Images: []
                }
            };
        }
        return Repository.GetUserProfileRepository({ user, ProfileLink });
    }
    catch (e) {
        return {
            message: 'Internal Server Error',
            status: 500,
            user: user,
            userData: null,
            post: {
                Images: []
            }
        };
    }
});
exports.GetUserProfile = GetUserProfile;
const CreateChannel = (_k, user_1) => __awaiter(void 0, [_k, user_1], void 0, function* ({ Description, Name, Type, Logo }, user) {
    try {
        if (!Name || !Type || !Description) {
            return {
                message: 'Add Channel Name',
                status: 202
            };
        }
        const Link = yield (0, firebase_1.uploadFileToFirebase)(Logo, `/logos/${user._id}/`);
        return Repository.CreateChannelRepository({ Description, Name, Type }, user, Link);
    }
    catch (e) {
        return {
            message: 'Internal Server Error',
            status: 500
        };
    }
});
exports.CreateChannel = CreateChannel;
