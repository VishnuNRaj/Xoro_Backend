import { Schema, model,Types } from "mongoose";
import { Comments, CommentReply } from "../../../entities/ModelsInterface/Comments";


const CommentReplySchema = new Schema<CommentReply>({
    Comment: [String],
    UserId: Types.ObjectId,
    Likes: Number,
    CommentId: Types.ObjectId,
    Edited:Boolean,
    Tags:[Types.ObjectId]
});

const CommentSchema = new Schema<Comments>({
    Comment: [String],
    PostId: Types.ObjectId,
    UserId: Types.ObjectId,
    Likes: Number,
    Edited:Boolean,
    Tags:[Types.ObjectId]
});



const CommentModel = model<Comments>("comments", CommentSchema);
export const CommentReplies = model<CommentReply>("commentreplies", CommentReplySchema)
export default CommentModel;
