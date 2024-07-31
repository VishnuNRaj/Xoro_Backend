import { ObjectId } from "mongoose";
import ChannelModel from "../models/Channels"
export const getChannel = async (ChannelId:ObjectId) => {
    try {
        const response = await ChannelModel.findById(ChannelId);
        return response
    } catch (e) {
        return null
    }
}