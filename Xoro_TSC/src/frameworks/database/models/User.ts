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
        type: Date,
        default: new Date()
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
        default: 'https://blogger.googleusercontent.com/img/a/AVvXsEhqzeTOTJm2J-wrSe9kAj3DlAphY5RzFw3W4xf25OPT1AEktfD1Z70sYBclrMDeuD6jAeZzJPByXgH272iG3hxS7AGppznCwS1yzioR77m4J03rVdFLmL3TtLjVmUfaCk-p1D3Jdkj6fp-9U64Tnqg1EMKT9OXpclfVjKrYeqT-OJWdnq9JBh_8ZZKWpsM=s1600-rw'
    },
    ProfileLock: { type: Boolean, default: false }
});

const User = model<UserDocument>('users', userSchema);

export default User;
