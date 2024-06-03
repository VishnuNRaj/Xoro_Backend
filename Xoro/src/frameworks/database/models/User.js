"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
const userSchema = new mongoose_1.Schema({
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
    Streams: mongodb_1.ObjectId,
    Profile: String,
    Suspended: Boolean,
    Terminated: Boolean,
    Connections: mongodb_1.ObjectId,
    Wallet: mongodb_1.ObjectId,
    Hashtags: [String],
    SuspendedTill: Date,
    Reason: String,
    Referral: String,
    Reports: mongodb_1.ObjectId,
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
        BlockedUsers: mongodb_1.ObjectId,
        Favourites: mongodb_1.ObjectId,
        Notifications: {
            type: Boolean,
            default: false
        },
    },
    Channel: {
        type: mongoose_1.Types.ObjectId,
    },
    Banner: {
        type: String,
        default: 'https://blogger.googleusercontent.com/img/a/AVvXsEhqzeTOTJm2J-wrSe9kAj3DlAphY5RzFw3W4xf25OPT1AEktfD1Z70sYBclrMDeuD6jAeZzJPByXgH272iG3hxS7AGppznCwS1yzioR77m4J03rVdFLmL3TtLjVmUfaCk-p1D3Jdkj6fp-9U64Tnqg1EMKT9OXpclfVjKrYeqT-OJWdnq9JBh_8ZZKWpsM=s1600-rw'
    },
    ProfileLock: { type: Boolean, default: false },
    VIP: { type: Boolean, default: false },
});
const User = (0, mongoose_1.model)('users', userSchema);
exports.default = User;
