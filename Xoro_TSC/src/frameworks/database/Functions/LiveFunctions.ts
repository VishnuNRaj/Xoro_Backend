import Live from "../models/Live"
import CategoryModel from "../models/Category"
import Reactions from "../models/Reactions"
import { isObjectIdOrHexString, ObjectId, Types } from "mongoose";
export const getLive = async (Key: string) => {
    try {
        const [live]: any = await Live.aggregate([
            {
                $match: {
                    Key: Key
                }
            }, {
                $lookup: {
                    from: 'reactions',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'reactions'
                }
            },
            {
                $lookup: {
                    from: 'channels',
                    localField: 'UserId',
                    foreignField: '_id',
                    as: 'channel'
                }
            }
        ])
        if (!live) return {
            message: "No Live Stream Found",
            status: 201,
        };
        return {
            message: "Streaming Now",
            status: 200,
            live
        }

    } catch (e) {
        return {
            message: "Internal Server Error",
            status: 201,
        };
    }
}

export const getLiveVideos = async (isLive: boolean, category: string | null, arr: string[]) => {
    try {
        let options: any[] = []
        const ids = arr.filter((id) => isObjectIdOrHexString(id)).map((id) => new Types.ObjectId(id))
        const cat = category ? await CategoryModel.findOne({ Name: category }) : null
        let total: any = {}
        if (isLive) total.Live = true;
        else total.Completed = true;
        const count = await Live.countDocuments(total)
        console.log(count,arr)
        if (count === arr.length) return {
            count, live: [], message: "No More Live Streams to show", status: 201
        }
        if (cat) {
            options.push({ $match: { RelatedTags: cat.Name, Live: isLive, _id: { $nin: ids } } })
        } else options.push({ $match: { Live: isLive, _id: { $nin: ids } } })
        options.push(
            { $sample: { size: count } },
            {
                $lookup: {
                    from: 'reactions',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'reactions'
                }
            },
            {
                $lookup: {
                    from: 'channels',
                    localField: 'UserId',
                    foreignField: '_id',
                    as: 'channel'
                }
            })
        const data = await Live.aggregate(options)
        return {
            live:data, status: 200, message: "Found", count
        }
    } catch (e) {
        return {
            data: [], status: 201, message: "Internal Server Error", count: 0
        }
    }
}

export const likeDislikeRemoveLive = async (type: string, id: string, userId: ObjectId) => {
    try {
        if (type === "remove") {
            const response = await Reactions.findByIdAndUpdate(id, { $pull: { Likes: userId, Dislikes: userId } })
            if (response) return {
                likes: response.Likes.length, dislikes: response.Dislikes.length, message: "Added to liked videos", status: 200
            };
            else {
                return {
                    likes: 0, dislikes: 0, message: "No Video Found", status: 201
                };
            }
        }
        let field1 = "";
        let field2 = "";
        if (type === "dislike") {
            field1 = "Dislikes";
            field2 = "Likes"
        } else {
            field1 = "Likes";
            field2 = "Dislikes"
        }
        const response = await Reactions.findByIdAndUpdate(id, { $pull: { [field2]: userId }, $addToSet: { [field1]: userId } })
        if (response) return {
            likes: response.Likes.length, dislikes: response.Dislikes.length, message: "Added to liked videos", status: 200
        };
        else {
            return {
                likes: 0, dislikes: 0, message: "No Video Found", status: 201
            };
        }
    } catch (e) {
        return {
            likes: 0, dislikes: 0, message: "Internal Server Error", status: 201
        };
    }
}