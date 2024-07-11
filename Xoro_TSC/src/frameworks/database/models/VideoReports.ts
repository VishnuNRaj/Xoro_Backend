import { model, Types, Schema } from "mongoose";
import { VideoReports } from '../../../entities/ModelsInterface/Reports';

const VideoReportSchema = new Schema<VideoReports>({
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

const VideoReport = model<VideoReports>("videoreports", VideoReportSchema)
export default VideoReport