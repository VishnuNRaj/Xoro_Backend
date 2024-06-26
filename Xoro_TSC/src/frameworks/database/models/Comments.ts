import { Document, Schema, model } from "mongoose";
import { ObjectId } from "mongodb";
import { AllCommments, Comment, CommentReply } from "../../../entities/ModelsInterface/Comments";


const CommentReplySchema = new Schema<CommentReply>({
    Comment: String,
    UserId: ObjectId,
    Likes: Number,
    Dislikes: Number
});

const CommentSchema = new Schema<Comment>({
    Comment: String,
    UserId: ObjectId,
    Likes: Number,
    Dislikes: Number,
    Replies: [CommentReplySchema]
});


const AllCommentSchema = new Schema<AllCommments>({
    Comments: [CommentSchema],
    PostId: ObjectId
});


const CommentModel = model<AllCommments>("Comment", AllCommentSchema);

export default CommentModel;
