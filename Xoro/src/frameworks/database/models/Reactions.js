"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReactionsSchema = new mongoose_1.Schema({
    PostId: { type: mongoose_1.Types.ObjectId, required: true },
    Likes: {
        type: [mongoose_1.Types.ObjectId],
        default: []
    },
    Dislikes: {
        type: [mongoose_1.Types.ObjectId],
        default: []
    },
    Views: {
        type: [mongoose_1.Types.ObjectId],
        default: []
    }
});
const Reactions = (0, mongoose_1.model)('reactions', ReactionsSchema);
exports.default = Reactions;
