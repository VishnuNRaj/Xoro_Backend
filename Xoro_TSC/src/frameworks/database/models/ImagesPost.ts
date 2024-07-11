import { Schema, model } from 'mongoose'
import { Post } from '../../../entities/ModelsInterface/PostImages'
import { ObjectId } from 'mongodb'


export const PostSchema = new Schema<Post>({
    Caption: String,
    UserId:ObjectId,
    Images: [{
        postType: String,
        link: String,
    }],
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
    },
    Banned:{
        type:Boolean,
        default:false
    }
});

const PostImages = model<Post>('postimages', PostSchema);
export default PostImages; 