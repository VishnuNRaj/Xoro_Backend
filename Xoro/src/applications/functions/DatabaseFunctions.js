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
exports.getChats = exports.searchData = exports.countDocuments = exports.likeDislikePost = exports.saveData = exports.deleteUsingId = exports.findUsers = exports.findData = exports.checkObjectId = exports.executeBulkWrite = exports.pullReactions = exports.findAndPull = exports.findOneAndUpdate = exports.updateByData = exports.updateById = exports.insertData = exports.findUsingId = exports.findOneData = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const User_1 = __importDefault(require("../../frameworks/database/models/User"));
const ImagesPost_1 = __importDefault(require("../../frameworks/database/models/ImagesPost"));
const Chat_1 = __importDefault(require("../../frameworks/database/models/Chat"));
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
const pullReactions = (Db, id, value) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Db.findByIdAndUpdate(id, {
        $pull: {
            Likes: new mongoose_1.default.Types.ObjectId(value),
            Dislikes: new mongoose_1.default.Types.ObjectId(value)
        }
    });
});
exports.pullReactions = pullReactions;
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
const findUsers = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const objectIdArray = userId.map(id => new mongoose_1.Types.ObjectId(id));
    return yield User_1.default.find({ _id: { $in: objectIdArray } });
});
exports.findUsers = findUsers;
const deleteUsingId = (Db, id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Db.findByIdAndDelete(id);
});
exports.deleteUsingId = deleteUsingId;
const saveData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield data.save();
});
exports.saveData = saveData;
const likeDislikePost = (Db, id, value, field1, field2) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Db.findByIdAndUpdate(id, { $addToSet: { [field1]: new mongoose_1.default.Types.ObjectId(value) }, $pull: { [field2]: new mongoose_1.default.Types.ObjectId(value) } }, { new: true });
});
exports.likeDislikePost = likeDislikePost;
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
        return {
            user: users,
            post: posts
        };
    }
    catch (error) {
        console.error("Error searching:", error);
        return {
            user: [],
            post: []
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
            { $unwind: { path: '$messages', preserveNullAndEmptyArrays: true } }, // Unwind messages, allowing for empty arrays
            { $sort: { 'messages.Time': -1 } }, // Sort messages by time in descending order
            {
                $group: {
                    _id: '$RoomId',
                    latestMessage: { $first: '$messages' }
                }
            },
            {
                $lookup: {
                    from: 'chats',
                    localField: '_id',
                    foreignField: 'RoomId',
                    as: 'chat'
                }
            },
            { $unwind: '$chat' }, // Unwind the chat array to get a single chat document
            {
                $project: {
                    _id: 0,
                    RoomId: '$_id',
                    Users: '$chat.Users',
                    GroupName: '$chat.GroupName',
                    latestMessage: 1
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
