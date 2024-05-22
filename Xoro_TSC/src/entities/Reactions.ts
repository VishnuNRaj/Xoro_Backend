import { Document, ObjectId } from 'mongoose';

export interface ReactionsInterface extends Document {
    PostId: ObjectId;
    Likes:ObjectId[];
    Dislikes:ObjectId[];
    Views:ObjectId[];
}
