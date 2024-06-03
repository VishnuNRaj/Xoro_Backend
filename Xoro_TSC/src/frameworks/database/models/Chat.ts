import { model, Schema, Types } from 'mongoose';
import { Chat } from '../../../entities/Chat'
const ChatSchema = new Schema<Chat>({
    UserId: [Types.ObjectId],
    RoomId: {
        type: String,
        default: new Types.ObjectId().toString()
    },
})

const Chats = model<Chat>('chats', ChatSchema)
export default Chats