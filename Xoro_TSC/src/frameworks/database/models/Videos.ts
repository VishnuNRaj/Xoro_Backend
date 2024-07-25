import { model, Schema, Types } from 'mongoose'
import PostVideo from '../../../entities/ModelsInterface/Videos'

const VideoSchema = new Schema<PostVideo>({
    Caption: String,
    UserId: Types.ObjectId,
    Video: String,
    Thumbnail: String,
    Duration: String,
    Postdate: Date,
    Settings: {
        CommentsOn: Boolean,
        PremiumContent: Boolean,
        ListedContent: Boolean,
    },
    Restriction: Number,
    Hashtags: [String],
    RelatedTags: String,
    Views: {
        type: Number,
        default: 0,
    },
    Likes: {
        type: Number,
        default: 0,
    },
    Dislikes: {
        type: Number,
        default: 0,
    },
    Description: String,
    VideoLink: String,
    Uploaded: {
        type: Boolean,
        default: false,
    },
    Key: String,
})

const Videos = model<PostVideo>('videos', VideoSchema)

export default Videos