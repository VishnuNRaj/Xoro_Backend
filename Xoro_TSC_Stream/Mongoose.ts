import mongoose from "mongoose"
import { config } from "dotenv";
import { model, Schema, Types } from "mongoose";

config()
const mongooseConfig: Function = () => {
    mongoose.connect(process.env.MONGO || "").then(() => { console.log('Mongoose Connected') })
}

export const LiveSchema = new Schema({
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
    Video:String,
})

export const Live = model("lives", LiveSchema);
export default mongooseConfig;