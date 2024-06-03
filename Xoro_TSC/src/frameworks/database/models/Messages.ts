import { model, Schema, Types } from 'mongoose';
import { Messages } from '../../../entities/Chat'

const MessageSchema = new Schema<Messages>({
    RoomId:String,
    Message:{
        type:String,
        default:""
    },
    SenderId:Types.ObjectId,
    Files:[{
        FileLink:String,
        FileType:String,
    }],
    Time:{
        type:Date,
        default:new Date(),
    },
    Seen:[Types.ObjectId],
})