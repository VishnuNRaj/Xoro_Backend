import { model, Schema, Types } from 'mongoose';
import { Chat } from '../../../entities/ModelsInterface/Chat'
import { string } from 'joi';
const ChatSchema = new Schema<Chat>({
    Users: [{
        UserId:Types.ObjectId,
        Admin:{
            type:Boolean,
            default:false,
        },
    }],
    RoomId: {
        type: String,
        default: new Types.ObjectId().toString()
    },
    LastClear: [{
        UserId: Types.ObjectId,
        Time: {
            type: Date,
            default: new Date()
        }
    }],
    GroupName: String,
    Profile:String,
})

const Chats = model<Chat>('chats', ChatSchema)
export default Chats