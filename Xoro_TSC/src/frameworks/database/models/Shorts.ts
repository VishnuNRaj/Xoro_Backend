import { model, Schema, Types } from "mongoose";
import { Shorts } from "../../../entities/ModelsInterface/Shorts"
const SchemaData = new Schema<Shorts>({
    Caption: String,
    Hashtags: [String],
    ChannelId: Types.ObjectId,
    Video: String,
    Key: String,
    Likes: {
        type: Number,
        default: 0
    },
    Dislikes: {
        type: Number,
        default: 0
    },
    Comments: {
        type: Number,
        default: 0
    },
    Context: String,
    Settings: {
        Private: { type: Boolean, default: false },
        CommentsOn: { type: Boolean, default: true },
    },
    UploadDate: Date,
    Duration: String,
    Views: {
        type: Number,
        default: 0
    },
    Uploaded:{
        type:Boolean,
        default:false
    }
})

const ShortVideos = model<Shorts>("shorts", SchemaData);
export default ShortVideos;

