import { model, Schema, Types } from 'mongoose'
import PostVideo from '../../../entities/Videos'

const VideoSchema = new Schema<PostVideo>({
    Caption: String,
    UserId: Types.ObjectId,
    Video: String,
    Thumbnail: String,
    Duration: String,
    Postdate: Date,
    Settings: {
        CommentsOn: Boolean,
        ReactionsOn: Boolean,
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
    Description:String,
    VideoLInk:String,
})

const Videos = model<PostVideo>('videos', VideoSchema)

export default Videos