"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = void 0;
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
exports.PostSchema = new mongoose_1.Schema({
    Caption: String,
    UserId: mongodb_1.ObjectId,
    Images: [{
            postType: String,
            link: String,
        }],
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
    },
    Banned: {
        type: Boolean,
        default: false
    }
});
const PostImages = (0, mongoose_1.model)('postimages', exports.PostSchema);
exports.default = PostImages;
