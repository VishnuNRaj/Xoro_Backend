"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentReplies = void 0;
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
const CommentReplySchema = new mongoose_1.Schema({
    Comment: [String],
    UserId: mongodb_1.ObjectId,
    Likes: Number,
    CommentId: mongodb_1.ObjectId,
    Edited: Boolean,
    Tags: [mongodb_1.ObjectId]
});
const CommentSchema = new mongoose_1.Schema({
    Comment: [String],
    PostId: mongodb_1.ObjectId,
    UserId: mongodb_1.ObjectId,
    Likes: Number,
    Edited: Boolean,
    Tags: [mongodb_1.ObjectId]
});
const CommentModel = (0, mongoose_1.model)("comments", CommentSchema);
exports.CommentReplies = (0, mongoose_1.model)("commentreplies", CommentReplySchema);
exports.default = CommentModel;
