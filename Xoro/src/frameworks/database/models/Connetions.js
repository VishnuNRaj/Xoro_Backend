"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
const connectionsSchema = new mongoose_1.Schema({
    UserId: { type: mongodb_1.ObjectId, required: true },
    Followers: [{ type: mongodb_1.ObjectId, default: [] }],
    Following: [{ type: mongodb_1.ObjectId, default: [] }],
    Mutual: [{ type: mongodb_1.ObjectId, default: [] }],
    FollowRequests: [{ type: mongodb_1.ObjectId, default: [] }],
    FollowingRequests: [{ type: mongodb_1.ObjectId, default: [] }],
});
const Connections = (0, mongoose_1.model)('connections', connectionsSchema);
exports.default = Connections;
