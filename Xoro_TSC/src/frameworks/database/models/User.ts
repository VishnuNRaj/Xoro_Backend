import { Schema, model } from 'mongoose';
import { ObjectId } from 'mongodb';
import UserDocument from '../../../entities/User';

const userSchema = new Schema<UserDocument>({
    Name: String,
    Username: String,
    Followers: {
        type: Number,
        default: 0
    },
    Following: {
        type: Number,
        default: 0
    },
    Streams: ObjectId,
    Profile: String,
    Suspended: Boolean,
    Terminated: Boolean,
    Connections: ObjectId,
    Wallet: ObjectId,
    Images: ObjectId,
    Videos: ObjectId,
    Shorts: ObjectId,
    Stream: ObjectId,
    Hashtags: [String],
    SuspendedTill: Date,
    Reason: String,
    Referral: String,
    Reports: ObjectId,
    Age: Number,
    Gender: String,
    Country: String,
    Description: [String],
    CreatedAt: {
        type:Date,
        default:new Date()
    },
    ProfileLink: String,
    Posts: {
        type: Number,
        default: 0
    },
    Settings: {
        Private: {
            type: Boolean,
            default: false
        },
        BlockedUsers: ObjectId,
        Favourites: ObjectId,
        Notifications: {
            type: Boolean,
            default: false
        },
    },
    Banner: {
        type: String,
        default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fmosaic-lille.fr%2F%3Fo%3D290%2B-3d-hd-wallpapers-and-backgrounds-rr-eg1kVkTY&psig=AOvVaw0BEW4n9NCBHXhigAYdlIPT&ust=1713802676944000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPjEldba04UDFQAAAAAdAAAAABBb'
    },
});

const User = model<UserDocument>('users', userSchema);

export default User;
