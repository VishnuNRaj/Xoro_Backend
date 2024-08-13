import { model, Schema, Types } from 'mongoose';

import {
    CoinsInterface,
    RewardsInterface,
    UserCoinsInterface
} from '../../../entities/ModelsInterface/Rewards';


const coinSchema = new Schema<CoinsInterface>({
    Name: String,
    Image: String,
    Expiry: Date,
    Expired: {
        type: Boolean,
        default: false
    },
    Createdby: Types.ObjectId,
    From: {
        type: Date,
        default: new Date()
    },
    Value: {
        type: Number,
        default: 1
    },

})

const userCoinsSchema = new Schema<UserCoinsInterface>({
    UserId: Types.ObjectId,
    Coins: [{
        CoinId: Types.ObjectId,
        Count: Number,
        Claimed: Boolean
    }]
});


const rewardsSchema = new Schema<RewardsInterface>({
    Task: String,
    Description: String,
    Start: Date,
    End: Date,
    Counts: Number,
    Reward: {
        CoinId: String,
        Count: Number
    },
    Completed: {
        Date: Date,
        UserId: [Types.ObjectId]
    }
});

const CoinModel = model<CoinsInterface>('coins', coinSchema);
const UserCoinsModel = model<UserCoinsInterface>('user_coins', userCoinsSchema);
const RewardsModel = model<RewardsInterface>('rewards', rewardsSchema);
export default RewardsModel