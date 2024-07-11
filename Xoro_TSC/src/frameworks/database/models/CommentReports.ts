import { model, Types, Schema } from "mongoose";
import { CommentReports } from '../../../entities/ModelsInterface/Reports';

const CommentReportSchema = new Schema<CommentReports>({
    Report: Types.ObjectId,
    UserId: Types.ObjectId,
    VerifiedBy: Types.ObjectId,
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
    Content:String,
})

const CommentReport = model<CommentReports>("commentreports", CommentReportSchema)
export default CommentReport