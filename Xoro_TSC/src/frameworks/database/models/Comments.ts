import { Schema, model } from "mongoose";
import { ObjectId } from "mongodb";
import { Comment, CommentReply } from "../../../entities/ModelsInterface/Comments";


const CommentReplySchema = new Schema<CommentReply>({
    Comment: [String],
    UserId: ObjectId,
    Likes: Number,
    CommentId: ObjectId,
    Edited:Boolean,
    Tags:[ObjectId]
});

const CommentSchema = new Schema<Comment>({
    Comment: [String],
    PostId: ObjectId,
    UserId: ObjectId,
    Likes: Number,
    Edited:Boolean,
    Tags:[ObjectId]
});



const CommentModel = model<Comment>("comments", CommentSchema);
export const CommentReplies = model<CommentReply>("commentreplies", CommentReplySchema)
export default CommentModel;
