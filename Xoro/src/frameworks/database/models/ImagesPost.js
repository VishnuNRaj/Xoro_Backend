"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = void 0;
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
exports.PostSchema = new mongoose_1.Schema({
    Caption: String,
    Images: [String],
    Postdate: Date,
    Tags: [String],
    CommentsOn: Boolean,
    Hidden: Boolean,
    Likes: Number,
    Dislikes: Number,
    Comments: Number,
    CommentId: mongodb_1.ObjectId,
    Reactions: mongodb_1.ObjectId,
    Hashtags: [String],
    ShareLink: String,
    ShowReactions: {
        type: Boolean,
        default: true
    }
});
const PostImageSchema = new mongoose_1.Schema({
    UserId: {
        type: mongodb_1.ObjectId,
        required: true,
    },
    Posts: [exports.PostSchema],
});
const PostImages = (0, mongoose_1.model)('postimages', PostImageSchema);
exports.default = PostImages;
