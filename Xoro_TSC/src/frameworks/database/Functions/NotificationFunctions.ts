import { ObjectId } from "mongoose"
import Notifications from "../models/Notifications"

export const getNotifications = async (userId: ObjectId, skip: number, limit: number = 25) => {
    try {
        const [notifications] = await Notifications.aggregate([
            {
                $match: { UserId: userId }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "Messages.SenderId",
                    foreignField: "_id",
                    as: "sender"
                }
            },
            {
                $unwind: '$Messages'
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            },
            {
                $group: {
                    _id: '$_id',
                    messages: { $push: '$Messages' }
                }
            },
        ])
        return notifications;
    } catch (e) {
        console.error(e);
        return []
    }
}
