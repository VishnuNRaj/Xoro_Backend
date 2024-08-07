import { model, Schema, Types } from 'mongoose';
import { Messages } from '../../../entities/ModelsInterface/Chat'

const MessageSchema = new Schema<Messages>({
    RoomId: String,
    Message: {
        type: String,
        default: ""
    },
    SenderId: Types.ObjectId,
    Files: [{
        FileLink: String,
        FileType: String,
    }],
    Time: {
        type: Date,
        default: new Date(),
    },
    Redirect: String,
    Seen: [Types.ObjectId],
})

const Message = model<Messages>('messages', MessageSchema)
export default Message