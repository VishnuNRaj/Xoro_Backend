import { ObjectId } from "mongoose";
import ChannelModel from "../models/Channels"
import ShortVideos from "../models/Shorts";
export const getChannel = async (ChannelId: ObjectId) => {
    try {
        const response = await ChannelModel.findById(ChannelId);
        return response
    } catch (e) {
        return null
    }
}

export const getShortsVideos = async (id: string) => {
    try {
        const [response] = await ShortVideos.aggregate([
            {
                $match: { VideoLink: id }
            },
            {
                $lookup: {
                    from: 'channels',
                    localField: 'ChannelId',
                    foreignField: '_id',
                    as: 'channel'
                }
            },
            {
                $lookup: {
                    from: 'reactions',
                    localField: '_id',
                    foreignField: 'PostId',
                    as: 'reactions'
                }
            },
            {
                $project: {
                    _id: 1,
                    Caption: 1,
                    Hashtags: 1,
                    channel: { $arrayElemAt: ['$channel', 0] },
                    Video: 1,
                    Key: 1,
                    Likes: 1,
                    Dislikes: 1,
                    Comments: 1,
                    Context: 1,
                    Settings: 1,
                    UploadDate: 1,
                    Duration: 1,
                    Views: 1,
                    Uploaded: 1,
                    Banned: 1,
                    VideoLink: 1,
                    reactions: 1
                }
            }
        ]);
        if (!response) return {
            message: `${"No Video Found"}`,
            status: 201,
            shorts: null
        };
        if (response.Banned || response.Settings.Private) return {
            message: `${response.Banned ? "This Video has Been banned" : "This video is kept private"}`,
            status: 201,
            shorts: null
        };
        return {
            message:"Found",
            status:200,
            shorts:response
        };
    } catch (e) {
        console.error(e);
        return {
            message: "Internal Server Error",
            status: 201,
            shorts: null
        };
    }
};