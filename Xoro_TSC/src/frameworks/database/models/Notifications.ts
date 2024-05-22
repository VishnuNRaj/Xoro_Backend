import { model, Schema, Types } from 'mongoose'
import { Messages } from '../../../entities/Notification'

const NotificationSchema = new Schema<Messages>({
    UserId:Types.ObjectId,
    Messages:[{
        SenderId:Types.ObjectId,
        Type:String,
        Message:String,
        Time:{
            type:Date,
            default:new Date()
        },
        Link:String,
        Seen:{
            type:Boolean,
            default:false
        },
    }]
})

const Notifications = model<Messages>('notifications', NotificationSchema)

export default Notifications