import { model, Types, Schema } from "mongoose";
import { PostReports } from '../../../entities/ModelsInterface/Reports';

const PostReportSchema = new Schema<PostReports>({
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

const PostReport = model<PostReports>("postreports", PostReportSchema)
export default PostReport