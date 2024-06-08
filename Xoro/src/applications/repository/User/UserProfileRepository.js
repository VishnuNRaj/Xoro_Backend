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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateChannelRepository = exports.GetUserProfileRepository = exports.SearchUserRepository = exports.UnFollowUserRepository = exports.FollowUserRepository = exports.EditProfileData = exports.ProfileSettingsRepository = exports.SecureAccountRepository = exports.editProfilePicRepository = exports.editBannerRepository = void 0;
const DatabaseFunctions = __importStar(require("../../functions/DatabaseFunctions"));
const UnverifiedUsers_1 = __importDefault(require("../../../frameworks/database/models/UnverifiedUsers"));
const ResponseFunctions = __importStar(require("../../responses/UserResponse"));
const UserFunctions_1 = require("./../../functions/UserFunctions");
const bcryptjs_1 = require("bcryptjs");
const User_1 = __importDefault(require("./../../../frameworks/database/models/User"));
const Connetions_1 = __importDefault(require("./../../../frameworks/database/models/Connetions"));
const ImagesPost_1 = __importDefault(require("../../../frameworks/database/models/ImagesPost"));
const Channels_1 = __importDefault(require("../../../frameworks/database/models/Channels"));
const editBannerRepository = (_a) => __awaiter(void 0, [_a], void 0, function* ({ Image, user }) {
    try {
        const result = yield (0, UserFunctions_1.UploadFile)(Image);
        if (!result) {
            return ResponseFunctions.EditBannerRes({
                message: 'An Error Occured',
                status: 202,
                user: user
            });
        }
        user.Banner = result;
        yield DatabaseFunctions.saveData(user);
        return ResponseFunctions.EditBannerRes({
            user: user,
            status: 200,
            message: 'Banner Updated'
        });
    }
    catch (e) {
        return ResponseFunctions.EditBannerRes({
            user: user,
            status: 500,
            message: 'Internal Server Error'
        });
    }
});
exports.editBannerRepository = editBannerRepository;
const editProfilePicRepository = (_b) => __awaiter(void 0, [_b], void 0, function* ({ Image, user }) {
    try {
        const result = yield (0, UserFunctions_1.UploadFile)(Image);
        if (!result) {
            return ResponseFunctions.EditProfilePicRes({
                message: 'An Error Occured',
                status: 202,
                user: user
            });
        }
        user.Profile = result;
        console.log('*------------------------------------------------*');
        yield DatabaseFunctions.saveData(user);
        yield DatabaseFunctions.updateById(UnverifiedUsers_1.default, user._id, { Profile: result });
        return ResponseFunctions.EditProfilePicRes({
            user: user,
            status: 200,
            message: 'Profile Pic Updated'
        });
    }
    catch (e) {
        return ResponseFunctions.EditProfilePicRes({
            user: user,
            status: 500,
            message: 'Internal Server Error'
        });
    }
});
exports.editProfilePicRepository = editProfilePicRepository;
const SecureAccountRepository = (_c) => __awaiter(void 0, [_c], void 0, function* ({ Password, user }) {
    try {
        const userData = yield DatabaseFunctions.findUsingId(UnverifiedUsers_1.default, user._id);
        if (!(yield (0, bcryptjs_1.compare)(Password, userData.Password))) {
            return ResponseFunctions.SecureAccountRes({
                message: "Incorrect Password",
                status: 203,
                user: user
            });
        }
        userData.TwoStepVerification = !userData.TwoStepVerification;
        yield DatabaseFunctions.saveData(userData);
        return ResponseFunctions.SecureAccountRes({
            user: user,
            status: 200,
            message: "Account Secure"
        });
    }
    catch (e) {
        return ResponseFunctions.SecureAccountRes({
            user: user,
            status: 500,
            message: 'Internal Server Error'
        });
    }
});
exports.SecureAccountRepository = SecureAccountRepository;
const ProfileSettingsRepository = (_d) => __awaiter(void 0, [_d], void 0, function* ({ user, Private, Notification, ProfileLock }) {
    try {
        user.Settings.Private = typeof Private === 'boolean' ? Private : user.Settings.Private;
        user.Settings.Notifications = typeof Notification === 'boolean' ? Notification : user.Settings.Notifications;
        user.ProfileLock = typeof ProfileLock === 'boolean' ? ProfileLock : user.ProfileLock;
        yield DatabaseFunctions.saveData(user);
        return ResponseFunctions.SecureAccountRes({
            message: 'Settings Updated',
            user: user,
            status: 200
        });
    }
    catch (e) {
        return ResponseFunctions.SecureAccountRes({
            message: 'Internal Server Error',
            user: user,
            status: 500
        });
    }
});
exports.ProfileSettingsRepository = ProfileSettingsRepository;
const EditProfileData = (_e) => __awaiter(void 0, [_e], void 0, function* ({ Name, user, Username, Description }) {
    try {
        user.Name = Name;
        user.Username = Username;
        user.Description = Description;
        yield DatabaseFunctions.saveData(user);
        return ResponseFunctions.EditProfileDataRes({
            user: user,
            status: 200,
            message: 'Profile Updated'
        });
    }
    catch (e) {
        console.log(e);
        return ResponseFunctions.EditProfileDataRes({
            message: 'Internal Server Error',
            user: user,
            status: 500
        });
    }
});
exports.EditProfileData = EditProfileData;
const FollowUserRepository = (_f) => __awaiter(void 0, [_f], void 0, function* ({ user, UserId }) {
    try {
        if (!DatabaseFunctions.checkObjectId(UserId)) {
            return ResponseFunctions.UnFollowUserRes({
                user: user,
                status: 201,
                message: 'Invalid Credentials'
            });
        }
        const user2 = yield DatabaseFunctions.findUsingId(User_1.default, UserId);
        if (!user2) {
            return ResponseFunctions.FollowUserRes({
                user: user,
                status: 201,
                message: 'Invalid Credentials',
            });
        }
        let userUpdate = {
            $addToSet: {
                Following: user2._id,
            }
        };
        let user2Update = {
            $addToSet: {
                Followers: user._id,
            }
        };
        if (user2.Settings.Private) {
            userUpdate = {
                $addToSet: {
                    FollowingRequests: UserId
                }
            };
            user2Update = {
                $addToSet: {
                    FollowRequests: user._id
                }
            };
        }
        const result1 = yield DatabaseFunctions.findOneAndUpdate(Connetions_1.default, { UserId: user2._id }, user2Update, { new: true });
        const result2 = yield DatabaseFunctions.findOneAndUpdate(Connetions_1.default, { UserId: user._id }, userUpdate, { new: true });
        user.Following = result2.Following.length;
        user2.Followers = result1.Followers.length;
        let data = {
            SenderId: user._id,
            Message: user2.Settings.Private ? 'New Follow Request' : 'New Follower',
            Link: user.Profile,
            Type: 'Following',
        };
        yield Promise.all([
            yield DatabaseFunctions.saveData(user),
            yield DatabaseFunctions.saveData(user2),
            yield (0, UserFunctions_1.createNotification)(data, user2._id)
        ]);
        return ResponseFunctions.FollowUserRes({
            user: user,
            status: 200,
            message: user2.Settings.Private ? 'Follow Request Sent' : 'Success',
            notification: {
                SenderId: user.Username,
                Message: user2.Settings.Private ? 'New Follow Request' : 'New Follower',
                Link: user.Profile,
                Type: 'Following',
                Time: new Date()
            }
        });
    }
    catch (e) {
        console.error(e);
        return ResponseFunctions.FollowUserRes({
            user: user,
            status: 500,
            message: 'Internal Server Error'
        });
    }
});
exports.FollowUserRepository = FollowUserRepository;
const UnFollowUserRepository = (_g) => __awaiter(void 0, [_g], void 0, function* ({ user, UserId }) {
    try {
        if (!DatabaseFunctions.checkObjectId(UserId)) {
            return ResponseFunctions.UnFollowUserRes({
                user: user,
                status: 201,
                message: 'Invalid Credentials'
            });
        }
        const result = yield DatabaseFunctions.findOneAndUpdate(Connetions_1.default, { UserId: user._id }, { $pull: { Following: UserId } }, { new: true, upsert: true });
        const user2 = yield DatabaseFunctions.findOneAndUpdate(Connetions_1.default, { UserId: UserId }, { $pull: { Followers: user._id } }, { new: true, upsert: true });
        console.log(user2, result);
        console.log(user2, '__________');
        user.Following = result.Following.length;
        user.Connections = result._id;
        yield DatabaseFunctions.updateById(User_1.default, UserId, { Followers: user2.Followers.length });
        yield DatabaseFunctions.saveData(user);
        return ResponseFunctions.UnFollowUserRes({
            user: user,
            status: 200,
            message: 'Success'
        });
    }
    catch (e) {
        return ResponseFunctions.UnFollowUserRes({
            message: 'Internal Server Error',
            status: 500,
            user: user
        });
    }
});
exports.UnFollowUserRepository = UnFollowUserRepository;
const SearchUserRepository = (_h) => __awaiter(void 0, [_h], void 0, function* ({ user, Search }) {
    try {
        const result = yield DatabaseFunctions.findData(User_1.default, {
            $or: [
                { Username: { $regex: Search, $options: 'i' } },
                { Name: { $regex: Search, $options: 'i' } },
            ]
        });
        console.log(result);
        return ResponseFunctions.SearchUserRes({
            user: user,
            message: 'Users Found',
            status: 200,
            users: result,
        });
    }
    catch (e) {
        return ResponseFunctions.SearchUserRes({
            user: user,
            users: null,
            status: 500,
            message: 'Internal Server Error'
        });
    }
});
exports.SearchUserRepository = SearchUserRepository;
const GetUserProfileRepository = (_j) => __awaiter(void 0, [_j], void 0, function* ({ user, ProfileLink }) {
    try {
        if (!ProfileLink || ProfileLink.length < 32) {
            return ResponseFunctions.GetUserProfileRes({
                user: user,
                status: 201,
                message: 'Invalid Credentials',
                userData: null
            });
        }
        const [userData] = yield User_1.default.aggregate([{ $match: { ProfileLink: ProfileLink } }, {
                $lookup: {
                    from: 'connections',
                    localField: '_id',
                    foreignField: 'UserId',
                    as: 'connections'
                }
            }]);
        if (!userData) {
            return ResponseFunctions.GetUserProfileRes({
                user: user,
                status: 201,
                message: 'No User Found',
                userData: null
            });
        }
        if (userData.Settings.Private) {
            return ResponseFunctions.GetUserProfileRes({
                user: user,
                status: 200,
                message: 'Private Profile',
                userData: userData,
                post: { Images: [] }
            });
        }
        const post = yield Promise.all([
            yield DatabaseFunctions.findData(ImagesPost_1.default, { UserId: userData._id })
        ]);
        console.log(post[0]);
        return ResponseFunctions.GetUserProfileRes({
            user: user,
            status: 200,
            message: 'User Found',
            userData: userData,
            post: {
                Images: post[0]
            }
        });
    }
    catch (e) {
        return ResponseFunctions.GetUserProfileRes({
            message: 'Internal Server Error',
            userData: null,
            user: user,
            status: 500
        });
    }
});
exports.GetUserProfileRepository = GetUserProfileRepository;
const CreateChannelRepository = (_k, user_1, Link_1) => __awaiter(void 0, [_k, user_1, Link_1], void 0, function* ({ Name, Description, Type }, user, Link) {
    try {
        if (user.Channel) {
            return ResponseFunctions.createChannelRes({
                message: 'Channel Already Created',
                status: 203
            });
        }
        const [newChannel] = yield DatabaseFunctions.insertData(Channels_1.default, {
            Name, Description, Type, UserId: user._id, Logo: Link
        });
        user.Channel = newChannel._id;
        yield DatabaseFunctions.saveData(user);
        return ResponseFunctions.createChannelRes({
            message: 'Channel Created SuccessFully',
            status: 200
        });
    }
    catch (e) {
        console.log(e);
        return ResponseFunctions.createChannelRes({
            message: 'Internal Server Error',
            status: 500
        });
    }
});
exports.CreateChannelRepository = CreateChannelRepository;
