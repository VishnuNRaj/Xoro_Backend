"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ChatSchema = new mongoose_1.Schema({
    Users: [{
            UserId: mongoose_1.Types.ObjectId,
            Admin: {
                type: Boolean,
                default: false,
            },
        }],
    RoomId: {
        type: String,
        default: new mongoose_1.Types.ObjectId().toString()
    },
    LastClear: [{
            UserId: mongoose_1.Types.ObjectId,
            Time: {
                type: Date,
                default: new Date()
            }
        }],
    GroupName: String,
    Profile: String,
});
const Chats = (0, mongoose_1.model)('chats', ChatSchema);
exports.default = Chats;
