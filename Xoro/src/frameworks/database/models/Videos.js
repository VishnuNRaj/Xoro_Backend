"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const VideoSchema = new mongoose_1.Schema({
    Caption: String,
    UserId: mongoose_1.Types.ObjectId,
    Video: String,
    Thumbnail: String,
    Duration: String,
    Postdate: Date,
    Settings: {
        CommentsOn: Boolean,
        ReactionsOn: Boolean,
        PremiumContent: Boolean,
        ListedContent: Boolean,
    },
    Restriction: Number,
    Hashtags: [String],
    RelatedTags: String,
    Views: {
        type: Number,
        default: 0,
    },
    Description: String,
    VideoLInk: String,
});
const Videos = (0, mongoose_1.model)('videos', VideoSchema);
exports.default = Videos;
