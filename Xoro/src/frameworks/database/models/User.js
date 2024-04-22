"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
const userSchema = new mongoose_1.Schema({
    Name: String,
    Username: String,
    Followers: {
        type: Number,
        default: 0
    },
    Following: {
        type: Number,
        default: 0
    },
    Streams: mongodb_1.ObjectId,
    Profile: String,
    Suspended: Boolean,
    Terminated: Boolean,
    Connections: mongodb_1.ObjectId,
    Wallet: mongodb_1.ObjectId,
    Images: mongodb_1.ObjectId,
    Videos: mongodb_1.ObjectId,
    Shorts: mongodb_1.ObjectId,
    Stream: mongodb_1.ObjectId,
    Hashtags: [String],
    SuspendedTill: Date,
    Reason: String,
    Referral: String,
    Reports: mongodb_1.ObjectId,
    Age: Number,
    Gender: String,
    Country: String,
    Description: [String],
    CreatedAt: {
        type: Date,
        default: new Date()
    },
    ProfileLink: String,
    Posts: {
        type: Number,
        default: 0
    },
    Settings: {
        Private: {
            type: Boolean,
            default: false
        },
        BlockedUsers: mongodb_1.ObjectId,
        Favourites: mongodb_1.ObjectId,
        Notifications: {
            type: Boolean,
            default: false
        },
    },
    Banner: {
        type: String,
        default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmosaic-lille.fr%2F%3Fo%3D290%2B-3d-hd-wallpapers-and-backgrounds-rr-eg1kVkTY&psig=AOvVaw0BEW4n9NCBHXhigAYdlIPT&ust=1713802676944000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPjEldba04UDFQAAAAAdAAAAABBb'
    },
});
const User = (0, mongoose_1.model)('users', userSchema);
exports.default = User;
