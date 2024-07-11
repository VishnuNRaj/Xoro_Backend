"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const VideoReportSchema = new mongoose_1.Schema({
    Report: mongoose_1.Types.ObjectId,
    UserId: mongoose_1.Types.ObjectId,
    VerifiedBy: mongoose_1.Types.ObjectId,
    ReportStatus: {
        type: Boolean,
        default: false
    },
    ReportDate: {
        type: Date,
        default: new Date(),
    },
    Severity: String,
    Action: {
        type: String,
        default: "None",
    },
    Review: String,
    Message: String,
    Resend: {
        type: Boolean,
        default: false,
    },
    Content: String,
});
const VideoReport = (0, mongoose_1.model)("videoreports", VideoReportSchema);
exports.default = VideoReport;
