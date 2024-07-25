import { Schema, model, Types } from "mongoose";
import { ReactionsInterface } from "../../../entities/ModelsInterface/Reactions";


const ReactionsSchema = new Schema<ReactionsInterface>({
    PostId: { type: Types.ObjectId, required: true },
    Likes: {
        type: [Types.ObjectId],
        default: []
    },
    Dislikes: {
        type: [Types.ObjectId],
        default: []
    },
    Views: {
        type: [Types.ObjectId],
        default: []
    }
})

const Reactions = model<ReactionsInterface>('reactions', ReactionsSchema)
export default Reactions