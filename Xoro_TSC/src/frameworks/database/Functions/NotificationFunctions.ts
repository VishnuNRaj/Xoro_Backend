import { model, Schema,Types } from "mongoose";

const friends = new Schema({
    userID:Types.ObjectId,
    friends:[Types.ObjectId],
})


const request = new Schema({
    sender:Types.ObjectId,
    reciever:Types.ObjectId
})



const Requests = model("requests",request)
const userId = "123344"
Requests.find({or:[{
    sender:userId,reciever:userId
}]})


