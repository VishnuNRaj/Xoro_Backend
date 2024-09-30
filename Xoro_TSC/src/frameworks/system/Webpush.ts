import webpush from "web-push";
import webPushConfig, { getSubscriptionsByUserId, removeSubscription } from "../../config/web-push";
import { ObjectId } from "mongoose";
import WebpushInterface from "../../entities/ModelsInterface/Webpush";
const { privateKey, publicKey, subject } = webPushConfig
webpush.setVapidDetails(subject, publicKey, privateKey)



const sendPushNotifications = async (data: any, userId: ObjectId) => {
    try {
        const users: WebpushInterface[] = await getSubscriptionsByUserId(userId);
        users.forEach(async (user) => {
            try {
                if (user.send) {
                    const res = await webpush.sendNotification(user, JSON.stringify(data));
                    console.log(res, "____");
                }
            } catch (error: any) {
                if (error.statusCode === 410) {
                    await removeSubscription(user.endpoint);
                } else {
                    console.error('Error sending push notification:', error);
                }
            }
        });
        return true;
    } catch (error: any) {
        console.error('Error fetching push subscriptions:', error);
        return false;
    }
};


export default sendPushNotifications;
 