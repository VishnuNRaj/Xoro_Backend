import { model, Schema, Types } from "mongoose";
import LiveInterface from "../../../entities/ModelsInterface/Live";
export const LiveSchema = new Schema<LiveInterface>({
    Caption: String,
    Description: String,
    Start: Date,
    End: Date,
    Likes: {
        type: Number,
        default: 0
    },
    Dislikes: {
        type: Number,
        default: 0
    },
    Views: {
        type: Number,
        default: 0
    },
    Reports: {
        type: Number,
        default: 0
    },
    Restriction: Number,
    Duration: String,
    Key: String,
    RelatedTags: String,
    Completed: {
        type: Boolean,
        default: false
    },
    Live: {
        type: Boolean,
        default: false
    },
    Thumbnail: String,
    UserId: Types.ObjectId,
    from: {
        type: String,
        default: "server"
    },
    Video: String,
})

const Live = model<LiveInterface>("lives", LiveSchema);
export default Live;