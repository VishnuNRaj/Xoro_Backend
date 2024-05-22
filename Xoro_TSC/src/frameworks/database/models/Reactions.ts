import { Schema, model } from "mongoose";
import { ReactionsInterface } from "../../../entities/Reactions";
import { ObjectId } from "mongodb";


const ReactionsSchema = new Schema<ReactionsInterface>({
    PostId: { type: ObjectId, required: true },
    Likes: {
        type: [ObjectId],
        default: []
    },
    Dislikes: {
        type: [ObjectId],
        default: []
    },
    Views: {
        type: [ObjectId],
        default: []
    }
})

const Reactions = model<ReactionsInterface>('reactions', ReactionsSchema)
export default Reactions