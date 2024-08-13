import { ChannelInterface, PremiumUsersInterface } from '../../../entities/ModelsInterface/Channels';
import { model, Schema, Types } from 'mongoose';


const ChannelSchema = new Schema<ChannelInterface>({
    Name: String,
    UserId: String,
    Type: [String],
    Subsribers: {
        type: [Types.ObjectId],
        default: [],
    },
    Reports: {
        type: Number,
        default: 0
    },
    Description: String,
    Logo: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSojclzzRsQKY9EiIzhdDfH1Bb4M2KRFXWKXQ&s'
    },
    ChannelLink: String,
});

const PremiumChannelSchema = new Schema<PremiumUsersInterface>({
    ChannelId: Types.ObjectId,
    Price:Number,
    Users: [{
        UserId: Types.ObjectId,
        CreatedAt: { type: Date, expires: '30d', default: Date.now }
    }]
});


const ChannelModel = model<ChannelInterface>('channels', ChannelSchema);
export const Premium = model<PremiumUsersInterface>('premium_users', PremiumChannelSchema);


export default ChannelModel;