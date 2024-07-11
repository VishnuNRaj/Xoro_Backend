"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentReplies = void 0;
const mongoose_1 = require("mongoose");
const CommentReplySchema = new mongoose_1.Schema({
    Comment: [String],
    UserId: mongoose_1.Types.ObjectId,
    Likes: Number,
    CommentId: mongoose_1.Types.ObjectId,
    Edited: Boolean,
    Tags: [mongoose_1.Types.ObjectId]
});
const CommentSchema = new mongoose_1.Schema({
    Comment: [String],
    PostId: mongoose_1.Types.ObjectId,
    UserId: mongoose_1.Types.ObjectId,
    Likes: Number,
    Edited: Boolean,
    Tags: [mongoose_1.Types.ObjectId]
});
const CommentModel = (0, mongoose_1.model)("comments", CommentSchema);
exports.CommentReplies = (0, mongoose_1.model)("commentreplies", CommentReplySchema);
exports.default = CommentModel;
