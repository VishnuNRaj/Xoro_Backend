import { Document, ObjectId } from "mongoose";

interface PostVideo extends Document {
    Caption: string;
    UserId: ObjectId;
    Video: string;
    Thumbnail: string;
    Duration: string;
    Postdate: Date;
    Settings: {
        CommentsOn: boolean;
        PremiumContent: boolean;
        ListedContent: boolean;
    },
    Restriction: number;
    Hashtags: string[];
    RelatedTags: string;
    Views: number;
    Description: string;
    VideoLInk: string;
    Uploaded:boolean;
    Key:string;
}

export default PostVideo