import { Schema, model } from "mongoose";
import { ReactionsInterface } from "../../../entities/Reactions";
import { ObjectId } from "mongodb";


const ReactionsSchema = new Schema<ReactionsInterface>({
    PostId: { type: ObjectId, required: true },
    Likes: [ObjectId],
    Dislikes: [{ type: ObjectId }]
})

const Reactions = model<ReactionsInterface>('reactions',ReactionsSchema)

export default Reactions