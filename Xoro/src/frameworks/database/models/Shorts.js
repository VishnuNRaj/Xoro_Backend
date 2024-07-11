"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SchemaData = new mongoose_1.Schema({
    Caption: String,
    Hashtags: [String],
    ChannelId: mongoose_1.Types.ObjectId,
    Video: String,
    Key: String,
    Likes: {
        type: Number,
        default: 0
    },
    Dislikes: {
        type: Number,
        default: 0
    },
    Comments: {
        type: Number,
        default: 0
    },
    Context: String,
    Settings: {
        Private: { type: Boolean, default: false },
        CommentsOn: { type: Boolean, default: true },
    },
    UploadDate: Date,
    Duration: String,
    Views: {
        type: Number,
        default: 0
    },
    Uploaded: {
        type: Boolean,
        default: false
    }
});
const ShortVideos = (0, mongoose_1.model)("shorts", SchemaData);
exports.default = ShortVideos;
