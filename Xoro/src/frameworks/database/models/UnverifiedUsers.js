"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserAuthSchema = new mongoose_1.Schema({
    Name: String,
    Email: String,
    Password: String,
    Verified: {
        type: Boolean,
        default: false,
    },
    Suspended: {
        type: Boolean,
        default: false,
    },
    Terminated: {
        type: Boolean,
        default: false,
    },
    SuspendedTill: Date,
    Reason: String,
    VerificationLink: String,
    Username: String,
    Phone: String,
    LinkTimeout: Date,
    Profile: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/7153/7153150.png'
    },
    Banner: {
        type: String,
        default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmosaic-lille.fr%2F%3Fo%3D290%2B-3d-hd-wallpapers-and-backgrounds-rr-eg1kVkTY&psig=AOvVaw0BEW4n9NCBHXhigAYdlIPT&ust=1713802676944000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPjEldba04UDFQAAAAAdAAAAABBb'
    },
    TwoStepVerification: {
        type: Boolean,
        default: false,
    },
});
const UserAuth = (0, mongoose_1.model)('unverifiedusers', UserAuthSchema);
exports.default = UserAuth;
