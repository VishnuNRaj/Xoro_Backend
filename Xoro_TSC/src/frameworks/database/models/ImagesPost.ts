import { Schema, model } from 'mongoose'
import { Post, PostImage } from '../../../entities/PostImages'
import { ObjectId } from 'mongodb'


export const PostSchema = new Schema<Post>({
    Caption: String,
    Images: [String],
    Postdate: Date,
    Tags: [String],
    CommentsOn: Boolean,
    Hidden: Boolean,
    Likes: Number,
    Dislikes: Number,
    Comments: Number,
    CommentId: ObjectId,
    Reactions: ObjectId,
    Hashtags: [String],
    ShareLink: String,
    ShowReactions: {
        type: Boolean,
        default: true
    }
});

const PostImageSchema = new Schema<PostImage>({
    UserId: {
        type: ObjectId,
        required: true,
    },
    Posts: [PostSchema],
});

const PostImages = model<PostImage>('postimages', PostImageSchema);

export default PostImages;