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
exports.setMarkAsRead = exports.setOnline = exports.deleteChat = exports.saveChat = void 0;
const Connetions_1 = __importDefault(require("../models/Connetions"));
const Messages_1 = __importDefault(require("../models/Messages"));
const User_1 = __importDefault(require("../models/User"));
const mongoose_1 = require("mongoose");
const saveChat = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let [response] = yield Messages_1.default.insertMany([Object.assign(Object.assign({}, data), { Time: new Date() })]);
        const user = yield User_1.default.findById(data.SenderId);
        return Object.assign(Object.assign({}, response), { user });
    }
    catch (e) {
        return null;
    }
});
exports.saveChat = saveChat;
const deleteChat = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id }) {
    try {
        yield Messages_1.default.findByIdAndDelete(id);
        return true;
    }
    catch (e) {
        return null;
    }
});
exports.deleteChat = deleteChat;
const setOnline = (UserId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userIdObject = new mongoose_1.Types.ObjectId(UserId);
        const aggregationResult = yield Connetions_1.default.aggregate([
            { $match: { UserId: userIdObject } },
            {
                $project: {
                    Followers: 1,
                    Following: 1,
                    allConnections: { $setUnion: ["$Followers", "$Following"] }
                }
            },
            { $unwind: "$allConnections" },
            {
                $lookup: {
                    from: "users",
                    localField: "allConnections",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            { $unwind: "$userDetails" },
            {
                $addFields: {
                    isFollowed: { $in: ["$userDetails._id", "$Followers"] },
                    isFollowing: { $in: ["$userDetails._id", "$Following"] }
                }
            },
            {
                $group: {
                    _id: "$_id",
                    users: {
                        $addToSet: {
                            _id: "$userDetails._id",
                            Profile: "$userDetails.Profile",
                            Name: "$userDetails.Name",
                            Username: "$userDetails.Username",
                            ProfileLink: "$userDetails.ProfileLink",
                            isFollowed: "$isFollowed",
                            isFollowing: "$isFollowing"
                        }
                    }
                }
            },
            { $project: { users: 1, _id: 0 } }
        ]);
        return aggregationResult.length > 0 ? aggregationResult[0].users : [];
    }
    catch (e) {
        console.error("Error in setOnline:", e);
        return null;
    }
});
exports.setOnline = setOnline;
const setMarkAsRead = (RoomId, UserId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Messages_1.default.updateMany({ RoomId: RoomId, Seen: { $ne: UserId } }, { $addToSet: { Seen: UserId } });
    }
    catch (e) {
        console.error("Error in setMarkAsRead:", e);
        return null;
    }
});
exports.setMarkAsRead = setMarkAsRead;
