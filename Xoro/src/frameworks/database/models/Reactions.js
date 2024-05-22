"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
const ReactionsSchema = new mongoose_1.Schema({
    PostId: { type: mongodb_1.ObjectId, required: true },
    Likes: {
        type: [mongodb_1.ObjectId],
        default: []
    },
    Dislikes: {
        type: [mongodb_1.ObjectId],
        default: []
    },
    Views: {
        type: [mongodb_1.ObjectId],
        default: []
    }
});
const Reactions = (0, mongoose_1.model)('reactions', ReactionsSchema);
exports.default = Reactions;
