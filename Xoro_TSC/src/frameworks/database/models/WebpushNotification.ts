import { model, Types, Schema } from "mongoose"
import WebpushInterface from "../../../entities/ModelsInterface/Webpush";

const webpushSchema = new Schema<WebpushInterface>({
    UserId: { type: Schema.Types.ObjectId, },
    endpoint: { type: String, required: true },
    keys: {
        p256dh: { type: String, required: true },
        auth: { type: String, required: true }
    },
    send:{
        type:Boolean,
        default:true,
    },
}, {
    timestamps: true
});

const WebPush = model<WebpushInterface>("webpushs", webpushSchema)
export default WebPush;