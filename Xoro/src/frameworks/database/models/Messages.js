"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MessageSchema = new mongoose_1.Schema({
    RoomId: String,
    Message: {
        type: String,
        default: ""
    },
    SenderId: mongoose_1.Types.ObjectId,
    Files: [{
            FileLink: String,
            FileType: String,
        }],
    Time: {
        type: Date,
        default: new Date(),
    },
    Redirect: String,
    Seen: [mongoose_1.Types.ObjectId],
});
const Message = (0, mongoose_1.model)('messages', MessageSchema);
exports.default = Message;
