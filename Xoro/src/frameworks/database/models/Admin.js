"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AdminAuthSchema = new mongoose_1.Schema({
    Name: String,
    Email: String,
    Password: String,
    VerificationLink: String,
    Phone: String,
    LinkTimeout: Date,
    User: Boolean,
    Profile: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/7153/7153150.png'
    },
});
const AdminAuth = (0, mongoose_1.model)('admins', AdminAuthSchema);
exports.default = AdminAuth;
