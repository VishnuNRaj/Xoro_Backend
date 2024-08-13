import { Messages } from "../../../entities/ModelsInterface/Chat";
import { ConnectionsInterface } from "../../../entities/ModelsInterface/Connections";
import Connections from "../models/Connetions";
import Message from "../models/Messages";
import User from "../models/User";
import { Types } from "mongoose"

export const saveChat: Function = async (data: any) => {
    try {
        let [response]: any[] = await Message.insertMany([{ ...data, Time: new Date() }])
        const user = await User.findById(data.SenderId)
        return { ...response, user };
    } catch (e) {
        return null
    }
}

export const deleteChat: Function = async ({ id }: { id: string }) => {
    try {
        await Message.findByIdAndDelete(id)
        return true;
    } catch (e) {
        return null
    }
}

export const setOnline: Function = async (UserId: string) => {
    try {
        const userIdObject = new Types.ObjectId(UserId);

        const aggregationResult = await Connections.aggregate([
            { $match: { UserId: userIdObject } },
            {
                $project: {
                    Followers: 1,
                    Following: 1,
                    allConnections: { $setUnion: ["$Followers", "$Following"] }
                }
            },
            { $unwind: "$allConnections" },
            {
                $lookup: {
                    from: "users",
                    localField: "allConnections",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            { $unwind: "$userDetails" },
            {
                $addFields: {
                    isFollowed: { $in: ["$userDetails._id", "$Followers"] },
                    isFollowing: { $in: ["$userDetails._id", "$Following"] }
                }
            },
            {
                $group: {
                    _id: "$_id",
                    users: {
                        $addToSet: {
                            _id: "$userDetails._id",
                            Profile: "$userDetails.Profile",
                            Name: "$userDetails.Name",
                            Username: "$userDetails.Username",
                            ProfileLink: "$userDetails.ProfileLink",
                            isFollowed: "$isFollowed",
                            isFollowing: "$isFollowing"
                        }
                    }
                }
            },
            { $project: { users: 1, _id: 0 } }
        ]);

        return aggregationResult.length > 0 ? aggregationResult[0].users : [];
    } catch (e) {
        console.error("Error in setOnline:", e);
        return null;
    }
};

export const setMarkAsRead: Function = async (RoomId: string, UserId: string) => {
    try {
        await Message.updateMany(
            { RoomId: RoomId, Seen: { $ne: UserId } },
            { $addToSet: { Seen: UserId } }
        );
    } catch (e) {
        console.error("Error in setMarkAsRead:", e);
        return null;
    }
};
