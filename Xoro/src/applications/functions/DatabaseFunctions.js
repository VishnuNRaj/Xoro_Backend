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
exports.getChannel = exports.getComment = exports.getComments = exports.getPosts = exports.checkChat = exports.getFollowers = exports.getChat = exports.getChats = exports.searchData = exports.countDocuments = exports.likeDislikeVideo = exports.likeDislikePost = exports.saveData = exports.deleteMany = exports.deleteUsingId = exports.findUsersObjectId = exports.findUsers = exports.getUnReadNotifications = exports.findData = exports.checkObjectId = exports.executeBulkWrite = exports.pullVideoReactions = exports.pullReactions = exports.findAndPull = exports.findOneAndUpdate = exports.updateByData = exports.updateById = exports.insertData = exports.findUsingId = exports.findOneData = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const User_1 = __importDefault(require("../../frameworks/database/models/User"));
const ImagesPost_1 = __importDefault(require("../../frameworks/database/models/ImagesPost"));
const Chat_1 = __importDefault(require("../../frameworks/database/models/Chat"));
const Connetions_1 = __importDefault(require("../../frameworks/database/models/Connetions"));
const Channels_1 = __importDefault(require("../../frameworks/database/models/Channels"));
const Reactions_1 = __importDefault(require("../../frameworks/database/models/Reactions"));
const Notifications_1 = __importDefault(require("../../frameworks/database/models/Notifications"));
const Comments_1 = __importDefault(require("../../frameworks/database/models/Comments"));
const findOneData = (Db, query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Db.findOne(query);
});
exports.findOneData = findOneData;
const findUsingId = (Db, query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Db.findById(query);
});
exports.findUsingId = findUsingId;
const insertData = (Db, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Db.insertMany(data);
});
exports.insertData = insertData;
const updateById = (Db, id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Db.findByIdAndUpdate(id, { $set: data });
});
exports.updateById = updateById;
const updateByData = (Db, id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Db.findByIdAndUpdate(id, data);
});
exports.updateByData = updateByData;
const findOneAndUpdate = (Db, query, update, options) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Db.findOneAndUpdate(query, update, options);
});
exports.findOneAndUpdate = findOneAndUpdate;
const findAndPull = (Db, id, query, value) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Db.findByIdAndUpdate(id, { $pull: { [query]: new mongoose_1.default.Types.ObjectId(value) } });
});
exports.findAndPull = findAndPull;
const pullReactions = (Db, id, UserId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Db.findByIdAndUpdate(id, {
        $pull: {
            Likes: UserId,
            Dislikes: UserId
        }
    });
});
exports.pullReactions = pullReactions;
const pullVideoReactions = (id, UserId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Reactions_1.default.findOneAndUpdate({ PostId: id }, {
        $pull: {
            Likes: UserId,
            Dislikes: UserId
        }
    });
});
exports.pullVideoReactions = pullVideoReactions;
const executeBulkWrite = (Db, bulkOperations) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Db.bulkWrite(bulkOperations);
    }
    catch (e) {
        console.error(e);
        throw new Error('Bulk write operation failed');
    }
});
exports.executeBulkWrite = executeBulkWrite;
const checkObjectId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, mongoose_1.isObjectIdOrHexString)(id);
});
exports.checkObjectId = checkObjectId;
const findData = (Db, query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Db.find(query);
});
exports.findData = findData;
const getUnReadNotifications = (UserId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notifications = yield Notifications_1.default.aggregate([
            { $match: { UserId: UserId } },
            {
                $project: {
                    Messages: {
                        $filter: {
                            input: "$Messages",
                            as: "message",
                            cond: { $eq: ["$$message.Seen", false] }
                        }
                    }
                }
            },
            { $unwind: "$Messages" },
            {
                $lookup: {
                    from: "users",
                    localField: "Messages.SenderId",
                    foreignField: "_id",
                    as: "SenderInfo"
                }
            },
            { $unwind: "$SenderInfo" },
            {
                $project: {
                    _id: 1,
                    UserId: 1,
                    Messages: 1,
                    "SenderInfo.Username": 1,
                    "SenderInfo.Profile": 1,
                    "SenderInfo.ProfileLink": 1,
                    "SenderInfo._id": 1
                }
            }
        ]);
        return notifications;
    }
    catch (e) {
        console.error(e);
        return null;
    }
});
exports.getUnReadNotifications = getUnReadNotifications;
const findUsers = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const objectIdArray = userId.map(id => new mongoose_1.Types.ObjectId(id.UserId.toString()));
    return yield User_1.default.find({ _id: { $in: objectIdArray } });
});
exports.findUsers = findUsers;
const findUsersObjectId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const objectIdArray = userId.map(UserId => new mongoose_1.Types.ObjectId(UserId.toString()));
    return yield User_1.default.find({ _id: { $in: objectIdArray } }, { _id: 1 });
});
exports.findUsersObjectId = findUsersObjectId;
const deleteUsingId = (Db, id) => __awaiter(void 0, void 0, void 0, function* () { return yield Db.findByIdAndDelete(id); });
exports.deleteUsingId = deleteUsingId;
const deleteMany = (db, query) => __awaiter(void 0, void 0, void 0, function* () {
    return db.deleteMany(query);
});
exports.deleteMany = deleteMany;
const saveData = (data) => __awaiter(void 0, void 0, void 0, function* () { return yield data.save(); });
exports.saveData = saveData;
const likeDislikePost = (id, value, field1, field2) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Reactions_1.default.findByIdAndUpdate(id, { $addToSet: { [field1]: value }, $pull: { [field2]: value } }, { upsert: true });
});
exports.likeDislikePost = likeDislikePost;
const likeDislikeVideo = (id, value, field1, field2) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Reactions_1.default.findOneAndUpdate({ PostId: id }, { $addToSet: { [field1]: value }, $pull: { [field2]: value } }, { upsert: true });
});
exports.likeDislikeVideo = likeDislikeVideo;
const countDocuments = (Db, id, key) => __awaiter(void 0, void 0, void 0, function* () {
    return Db.countDocuments({ [key]: id });
});
exports.countDocuments = countDocuments;
const searchData = (search) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, exports.findData)(User_1.default, {
            $or: [
                { Username: { $regex: search, $options: 'i' } },
                { Name: { $regex: search, $options: 'i' } },
            ]
        });
        const posts = yield (0, exports.findData)(ImagesPost_1.default, { Hashtags: { $elemMatch: { $regex: search, $options: 'i' } } });
        const channel = yield (0, exports.findData)(Channels_1.default, { Name: { $regex: search, $options: 'i' } });
        return {
            users,
            post: posts,
            channel
        };
    }
    catch (error) {
        console.error("Error searching:", error);
        return {
            users: [],
            post: [],
            channel: []
        };
    }
});
exports.searchData = searchData;
const getChats = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Chat_1.default.aggregate([
            { $match: { 'Users.UserId': { $in: [userId] } } },
            {
                $lookup: {
                    from: 'messages',
                    localField: 'RoomId',
                    foreignField: 'RoomId',
                    as: 'messages'
                }
            },
            { $unwind: { path: '$messages', preserveNullAndEmptyArrays: true } },
            { $sort: { 'messages._id': -1 } },
            {
                $group: {
                    _id: '$RoomId',
                    latestMessage: { $first: '$messages' },
                    chat: { $first: '$$ROOT' }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    let: { userIds: '$chat.Users.UserId' },
                    pipeline: [
                        { $match: { $expr: { $in: ['$_id', '$$userIds'] } } }
                    ],
                    as: 'userData'
                }
            },
            {
                $project: {
                    _id: 0,
                    RoomId: '$_id',
                    Users: '$chat.Users',
                    users: '$userData',
                    GroupName: '$chat.GroupName',
                    latestMessage: 1,
                    Profile: "$chat.Profile"
                }
            }
        ]);
        return data;
    }
    catch (e) {
        console.error('Error fetching chats:', e);
        throw e;
    }
});
exports.getChats = getChats;
const getChat = (RoomId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [data] = yield Chat_1.default.aggregate([{ $match: { 'RoomId': RoomId } },
            {
                $lookup: {
                    from: 'messages',
                    localField: 'RoomId',
                    foreignField: 'RoomId',
                    as: 'messages'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'Users.UserId',
                    foreignField: '_id',
                    as: 'users'
                }
            }]);
        return data;
    }
    catch (e) {
        return null;
    }
});
exports.getChat = getChat;
const getFollowers = (UserId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [response] = yield Connetions_1.default.aggregate([
            { $match: { UserId: UserId } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'Followers',
                    foreignField: '_id',
                    as: 'follow'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'Following',
                    foreignField: '_id',
                    as: 'following'
                }
            },
            {
                $project: {
                    Following: 1,
                    Followers: 1,
                    follow: 1,
                    following: 1,
                    mutual: {
                        $filter: {
                            input: '$follow',
                            as: 'f',
                            cond: {
                                $in: ['$$f._id', '$Following']
                            }
                        }
                    }
                }
            },
            { $addFields: { mutual: { $slice: ['$mutual', 10] } } }
        ]);
        return response;
    }
    catch (e) {
        console.error('Error fetching followers:', e);
        return null;
    }
});
exports.getFollowers = getFollowers;
const checkChat = (UserIds) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Chat_1.default.findOne({
            "Users.UserId": {
                $all: UserIds.map((usr) => new mongoose_1.Types.ObjectId(usr))
            }
        });
    }
    catch (e) {
        return null;
    }
});
exports.checkChat = checkChat;
const getPosts = (UserIds_1, skip_1, ...args_1) => __awaiter(void 0, [UserIds_1, skip_1, ...args_1], void 0, function* (UserIds, skip, limit = 10) {
    try {
        console.log(UserIds);
        const posts = yield ImagesPost_1.default.aggregate([
            { $match: { UserId: { $in: UserIds } } },
            { $skip: skip },
            { $limit: limit },
            {
                $lookup: {
                    from: 'users',
                    let: { userId: '$UserId' },
                    pipeline: [
                        { $match: { $expr: { $eq: ['$_id', '$$userId'] } } },
                        { $project: { Username: 1, Name: 1, Profile: 1, ProfileLink: 1, _id: 1 } }
                    ],
                    as: 'user'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    let: { tagIds: '$Tags' },
                    pipeline: [
                        { $match: { $expr: { $in: ['$_id', '$$tagIds'] } } },
                        { $project: { Username: 1, Name: 1, Profile: 1, ProfileLink: 1, _id: 1 } }
                    ],
                    as: 'tags'
                }
            },
            {
                $lookup: {
                    from: 'reactions',
                    localField: 'Reactions',
                    foreignField: '_id',
                    as: 'reactions'
                }
            },
            {
                $unwind: {
                    path: '$reactions',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'users',
                    let: { likeIds: '$reactions.Likes' },
                    pipeline: [
                        { $match: { $expr: { $in: ['$_id', '$$likeIds'] } } },
                        { $project: { Username: 1, Name: 1, Profile: 1, ProfileLink: 1, _id: 1 } }
                    ],
                    as: 'reactions.LikesDetails'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    let: { dislikeIds: '$reactions.Dislikes' },
                    pipeline: [
                        { $match: { $expr: { $in: ['$_id', '$$dislikeIds'] } } },
                        { $project: { Username: 1, Name: 1, Profile: 1, ProfileLink: 1, _id: 1 } }
                    ],
                    as: 'reactions.DislikesDetails'
                }
            },
            {
                $addFields: {
                    user: { $arrayElemAt: ['$user', 0] },
                    'reactions.LikesDetails': '$reactions.LikesDetails',
                    'reactions.DislikesDetails': '$reactions.DislikesDetails',
                    tags: '$tags'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    doc: { $mergeObjects: '$$ROOT' },
                    comments: { $push: '$comments' }
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: ['$doc', { comments: '$comments' }]
                    }
                }
            }
        ]);
        return posts;
    }
    catch (e) {
        console.error('Error fetching posts:', e);
        return null;
    }
});
exports.getPosts = getPosts;
const getComments = (PostId, UserId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield Comments_1.default.aggregate([
            { $match: { PostId: new mongoose_1.Types.ObjectId(PostId) } },
            {
                $lookup: {
                    from: 'users',
                    let: { userId: '$UserId' },
                    pipeline: [
                        { $match: { $expr: { $eq: ['$_id', '$$userId'] } } },
                        { $project: { Username: 1, Name: 1, Profile: 1, ProfileLink: 1, _id: 1 } }
                    ],
                    as: 'user'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    let: { tagIds: '$Tags' },
                    pipeline: [
                        { $match: { $expr: { $in: ['$_id', '$$tagIds'] } } },
                        { $project: { Username: 1, Name: 1, Profile: 1, ProfileLink: 1, _id: 1 } }
                    ],
                    as: 'tags'
                }
            },
            {
                $addFields: {
                    user: { $arrayElemAt: ['$user', 0] }
                }
            }
        ]);
        console.log(comments);
        return comments;
    }
    catch (e) {
        console.log(e);
        return [];
    }
});
exports.getComments = getComments;
const getComment = (CommentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield Comments_1.default.aggregate([
            { $match: { _id: CommentId } },
            {
                $lookup: {
                    from: 'users',
                    let: { userId: '$UserId' },
                    pipeline: [
                        { $match: { $expr: { $eq: ['$_id', '$$userId'] } } },
                        { $project: { Username: 1, Name: 1, Profile: 1, ProfileLink: 1, _id: 1 } }
                    ],
                    as: 'user'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    let: { tagIds: '$Tags' },
                    pipeline: [
                        { $match: { $expr: { $in: ['$_id', '$$tagIds'] } } },
                        { $project: { Username: 1, Name: 1, Profile: 1, ProfileLink: 1, _id: 1 } }
                    ],
                    as: 'tags'
                }
            },
            {
                $addFields: {
                    user: { $arrayElemAt: ['$user', 0] }
                }
            }
        ]);
        console.log(comments);
        return comments;
    }
    catch (e) {
        console.log(e);
        return [];
    }
});
exports.getComment = getComment;
const getChannel = (ChannelId, UserId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [response] = yield Channels_1.default.aggregate([
            {
                $match: { _id: ChannelId }
            },
            {
                $lookup: {
                    from: "videos",
                    localField: "_id",
                    foreignField: "ChannelId",
                    as: "videos"
                }
            },
            {
                $addFields: {
                    subscribed: {
                        $cond: {
                            if: { $eq: [UserId, null] },
                            then: false,
                            else: {
                                $gt: [
                                    {
                                        $size: {
                                            $filter: {
                                                input: "$subscribers",
                                                as: "subscriber",
                                                cond: { $eq: ["$$subscriber.UserId", UserId] }
                                            }
                                        }
                                    },
                                    0
                                ]
                            }
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "reactions",
                    localField: "videos._id",
                    foreignField: "VideoId",
                    as: "reactions"
                }
            },
            {
                $addFields: {
                    totalLikes: {
                        $size: {
                            $filter: {
                                input: "$reactions",
                                as: "reaction",
                                cond: { $eq: ["$$reaction.type", "like"] }
                            }
                        }
                    },
                    totalDislikes: {
                        $size: {
                            $filter: {
                                input: "$reactions",
                                as: "reaction",
                                cond: { $eq: ["$$reaction.type", "dislike"] }
                            }
                        }
                    },
                    totalViews: {
                        $size: {
                            $filter: {
                                input: "$reactions",
                                as: "reaction",
                                cond: { $eq: ["$$reaction.type", "view"] }
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    videos: 1,
                    subscribed: 1,
                    totalLikes: 1,
                    totalDislikes: 1,
                    totalViews: 1
                }
            }
        ]);
        return response;
    }
    catch (e) {
        console.log(e);
        return null;
    }
});
exports.getChannel = getChannel;
