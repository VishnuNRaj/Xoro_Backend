import webpush from "web-push";
import webPushConfig, { getSubscriptionsByUserId } from "../../config/web-push";
import { Notification } from "../../entities/ModelsInterface/Notification"
import { ObjectId } from "mongoose";
import WebpushInterface from "../../entities/ModelsInterface/Webpush";
const { privateKey, publicKey, subject } = webPushConfig
webpush.setVapidDetails(subject, publicKey, privateKey)

const sendPushNotifications = async (data: any, userId: ObjectId) => {
    try {
        console.log(data)
        const users: WebpushInterface[] = await getSubscriptionsByUserId(userId)
        users.forEach(async (user) => {
            if (user.send) {
                const res = await webpush.sendNotification(user, JSON.stringify(data))
                console.log(res, "____")
            }
        })
        return true;
    } catch (error:any) {
        if (error.statusCode === 410) {
            console.log('Push subscription has expired or unsubscribed. Removing from database.');
        } else {
            console.error('Error sending push notification:', error);
        }
        return false;
    }
}

export default sendPushNotifications;
