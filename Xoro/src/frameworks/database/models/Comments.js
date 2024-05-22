"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
const CommentReplySchema = new mongoose_1.Schema({
    Comment: String,
    UserId: mongodb_1.ObjectId,
    Likes: Number,
    Dislikes: Number
});
const CommentSchema = new mongoose_1.Schema({
    Comment: String,
    UserId: mongodb_1.ObjectId,
    Likes: Number,
    Dislikes: Number,
    Replies: [CommentReplySchema]
});
const AllCommentSchema = new mongoose_1.Schema({
    Comments: [CommentSchema],
    PostId: mongodb_1.ObjectId
});
const CommentModel = (0, mongoose_1.model)("Comment", AllCommentSchema);
exports.default = CommentModel;
