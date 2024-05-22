"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NotificationSchema = new mongoose_1.Schema({
    UserId: mongoose_1.Types.ObjectId,
    Messages: [{
            SenderId: mongoose_1.Types.ObjectId,
            Type: String,
            Message: String,
            Time: {
                type: Date,
                default: new Date()
            },
            Link: String,
            Seen: {
                type: Boolean,
                default: false
            },
        }]
});
const Notifications = (0, mongoose_1.model)('notifications', NotificationSchema);
exports.default = Notifications;
