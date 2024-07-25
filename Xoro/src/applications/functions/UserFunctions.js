"use strict";
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
exports.getVideo = exports.getRandomVideos = exports.updateShortsLink = exports.updateVideoLink = exports.sendNotifications = exports.createNotification = exports.uploadToFirebase = exports.VerifyUser = exports.uploadBase64Image = exports.UploadFile = void 0;
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const fs_1 = __importDefault(require("fs"));
const firebase_1 = __importDefault(require("../../config/firebase"));
const Notifications_1 = __importDefault(require("../../frameworks/database/models/Notifications"));
const DatabaseFunctions_1 = require("./DatabaseFunctions");
const Videos_1 = __importDefault(require("../../frameworks/database/models/Videos"));
const Shorts_1 = __importDefault(require("../../frameworks/database/models/Shorts"));
const UploadFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileBuffer = fs_1.default.readFileSync(file.path);
        const fileString = fileBuffer.toString('base64');
        const result = yield cloudinary_1.default.uploader.upload(`data:${file.mimetype};base64,${fileString}`, {
            folder: 'User Profile'
        });
        fs_1.default.unlinkSync(file.path);
        return result.secure_url;
    }
    catch (e) {
        console.error(e);
        return false;
    }
});
exports.UploadFile = UploadFile;
const uploadBase64Image = (base64Image) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cloudinary_1.default.uploader.upload(base64Image, {
            folder: 'Post_Images',
        });
        return result.secure_url;
    }
    catch (error) {
        console.error('Error uploading image:', error);
        return 'Internal Server Error';
    }
});
exports.uploadBase64Image = uploadBase64Image;
const VerifyUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!user)
            return { message: "No User Found", status: false };
        if (user.Terminated)
            return { message: "Account Terminated", status: false };
        if (user.Suspended) {
            const currentDate = new Date();
            if (user.SuspendedTill && user.SuspendedTill > currentDate) {
                return { message: "Account Suspended", status: false };
            }
            else {
                user.Suspended = false;
                user.SuspendedTill = undefined;
                yield user.save();
            }
        }
        return { message: "User Verified", status: true };
    }
    catch (e) {
        return {
            message: 'Internal Server Error',
            status: false,
        };
    }
});
exports.VerifyUser = VerifyUser;
const uploadToFirebase = (file, path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = firebase_1.default.storage().bucket();
        const buffer = fs_1.default.readFileSync(file.path);
        yield store.file(path).save(buffer, {
            metadata: {
                contentType: file.mimetype
            }
        });
        console.log(store.file(path));
        const data = store.file(path);
        const signedUrl = yield data.getSignedUrl({
            action: 'read',
            expires: Date.now() + 15 * 60 * 1000,
        });
        console.log('Signed URL:', signedUrl);
        fs_1.default.unlinkSync(file.path);
        return signedUrl[0];
    }
    catch (e) {
        console.log(e);
        return e.message;
    }
});
exports.uploadToFirebase = uploadToFirebase;
const createNotification = (data, UserId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const datas = yield Notifications_1.default.findOne({ UserId: UserId });
        if (!datas) {
            Notifications_1.default.insertMany([{ UserId: UserId, Messages: [data] }]);
        }
        else {
            datas.Messages.push(data);
            yield datas.save();
        }
        return true;
    }
    catch (e) {
        return false;
    }
});
exports.createNotification = createNotification;
const sendNotifications = (Message, Type, userId, SenderId, Link) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            Message, Type, Link, SenderId, Time: new Date(),
        };
        yield Notifications_1.default.updateMany({ UserId: { $or: userId } }, { $push: { Messages: data } });
    }
    catch (e) {
        return null;
    }
});
exports.sendNotifications = sendNotifications;
const updateVideoLink = (videoId, link) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, DatabaseFunctions_1.updateById)(Videos_1.default, videoId, { Video: link, Uploaded: true });
        return true;
    }
    catch (e) {
        return false;
    }
});
exports.updateVideoLink = updateVideoLink;
const updateShortsLink = (videoId, link) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, DatabaseFunctions_1.updateById)(Shorts_1.default, videoId, { Video: link, Uploaded: true });
        return true;
    }
    catch (e) {
        return false;
    }
});
exports.updateShortsLink = updateShortsLink;
const getRandomVideos = (skip, random) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalVideos = yield Videos_1.default.countDocuments({ "Settings.ListedContent": true });
        const videos = yield Videos_1.default.aggregate([
            { $match: { "Settings.ListedContent": true } },
            // { $sample: { size: totalVideos } },
            { $skip: skip },
            { $limit: 12 },
            {
                $lookup: {
                    from: 'channels',
                    localField: 'UserId',
                    foreignField: '_id',
                    as: 'Channel'
                }
            },
            {
                $lookup: {
                    from: 'reactions',
                    localField: '_id',
                    foreignField: 'PostId',
                    as: 'Reactions'
                }
            },
        ]);
        return videos;
    }
    catch (error) {
        console.error('Error fetching random videos:', error);
        throw error;
    }
});
exports.getRandomVideos = getRandomVideos;
const getVideo = (VideoLink, UserId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(UserId);
        const [video] = yield Videos_1.default.aggregate([
            { $match: { VideoLink: VideoLink } },
            {
                $lookup: {
                    from: 'channels',
                    localField: 'UserId',
                    foreignField: '_id',
                    as: 'Channel'
                }
            },
            {
                $lookup: {
                    from: 'reactions',
                    localField: '_id',
                    foreignField: 'PostId',
                    as: 'reactions'
                }
            },
            {
                $addFields: {
                    Liked: { $in: [UserId, "$reactions.Likes"] },
                    Disliked: { $in: [UserId, "$reactions.Dislikes"] },
                    Viewed: { $in: [UserId, "$reactions.Views"] }
                }
            }
        ]);
        console.log(video);
        return video;
    }
    catch (error) {
        console.error('Error fetching video:', error);
        throw error;
    }
});
exports.getVideo = getVideo;
