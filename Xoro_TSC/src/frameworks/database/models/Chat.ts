import { model, Schema, Types } from 'mongoose';
import { Chat } from '../../../entities/Chat'
const ChatSchema = new Schema<Chat>({
    UserId: Types.ObjectId,
    Messages: [{
        SenderId: Types.ObjectId,
        RecieverId: Types.ObjectId,
        FileLink: String,
        FileType: String,
        Message: String,
        Seen: { type: Boolean, default: false },
        Time: {
            type: Date,
            default: new Date()
        }
    }],
    RoomId: {
        type: String,
        default: new Types.ObjectId().toString()
    },
})

const Chats = model<Chat>('chats', ChatSchema)
export default Chats