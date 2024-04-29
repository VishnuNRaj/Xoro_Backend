import { Document, ObjectId } from 'mongoose';

export interface ConnectionsInterface extends Document {
    UserId: ObjectId;
    Followers:ObjectId[];
    Following:ObjectId[];
    Mutual:ObjectId[];
    FollowRequests:ObjectId[];
    FollowingRequests:ObjectId[];
}