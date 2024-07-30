import { ObjectId } from 'mongoose';
import WebpushInterface from '../entities/ModelsInterface/Webpush';
import WebPush from '../frameworks/database/models/WebpushNotification';
import { config } from "dotenv"
import { env } from 'process';
import User from '../frameworks/database/models/User';

config()
export interface webPushSubscribe {
    subject: string;
    publicKey: string;
    privateKey: string;
}

const webPushConfig = <webPushSubscribe>{
    subject: env.VAPID_SUBJECT || "",
    publicKey: env.VAPID_PUBLIC_KEY || "",
    privateKey: env.VAPID_PRIVATE_KEY || ""
}


export const saveSubscription = async (subscription: WebpushInterface, userId: ObjectId) => {
    const existingSubscription = await WebPush.findOne({ endpoint: subscription.endpoint, UserId: userId });

    if (existingSubscription) {
        existingSubscription.keys = subscription.keys;
        await existingSubscription.save();
    } else {
        const newSubscription = new WebPush({...subscription,UserId:userId});
        await newSubscription.save();
    }
    const res =  await User.findByIdAndUpdate(userId, { $set: { "Settings.Notifications": true } })
    console.log(res)
    return res;
};

export const getSubscriptionsByUserId = async (userId: ObjectId) => {
    return await WebPush.find({ UserId: userId });
};


export default webPushConfig