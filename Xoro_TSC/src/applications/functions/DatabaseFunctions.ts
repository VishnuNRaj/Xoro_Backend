import mongoose, { Document, isObjectIdOrHexString, Mongoose, ObjectId, Types } from 'mongoose'
import UserDocument from '../../entities/ModelsInterface/User'
import { PostImage } from '../../entities/ModelsInterface/PostImages'
import User from '../../frameworks/database/models/User'
import PostImages from '../../frameworks/database/models/ImagesPost'
import Chats from '../../frameworks/database/models/Chat'
import { Chat } from '../../entities/ModelsInterface/Chat'
import Connections from '../../frameworks/database/models/Connetions'
import { ConnectionsInterface } from '../../entities/ModelsInterface/Connections'
import { ChannelInterface } from '../../entities/ModelsInterface/Channels'
import ChannelModel from '../../frameworks/database/models/Channels'
import Reactions from '../../frameworks/database/models/Reactions'
import Notifications from '../../frameworks/database/models/Notifications'
import CommentModel from '../../frameworks/database/models/Comments'
import CategoryModel from "../../frameworks/database/models/Category"
import ShortVideos from '../../frameworks/database/models/Shorts'
import Live from "../../frameworks/database/models/Live"
export const findOneData = async (Db: any, query: object): Promise<any> => {
    return await Db.findOne(query)
}

export const findUsingId = async (Db: any, query: string | undefined | ObjectId): Promise<any> => {
    return await Db.findById(query)
}

export const insertData = async (Db: any, data: object): Promise<any> => {
    return await Db.insertMany(data)
}

export const updateById = async (Db: any, id: string, data: object) => {
    return await Db.findByIdAndUpdate(id, { $set: data })
}

export const updateByData = async (Db: any, id: string, data: object) => {
    return await Db.findByIdAndUpdate(id, data)
}

export const findOneAndUpdate = async (Db: any, query: object, update: object, options: object) => {
    return await Db.findOneAndUpdate(
        query, update, options
    );
}

export const findAndPull = async (Db: any, id: string, query: string, value: string) => {
    return await Db.findByIdAndUpdate(id, { $pull: { [query]: new mongoose.Types.ObjectId(value) } })
}

export const pullReactions = async (Db: any, id: any, UserId: ObjectId) => {
    return await Db.findByIdAndUpdate(id, {
        $pull: {
            Likes: UserId,
            Dislikes: UserId
        }
    });
}

export const pullVideoReactions = async (id: ObjectId, UserId: ObjectId) => {
    return await Reactions.findByIdAndUpdate(id, {
        $pull: {
            Likes: UserId,
            Dislikes: UserId
        }
    });
}

export interface BulkOperation {
    updateOne: {
        filter: { UserId: string };
        update: { [key: string]: any };
        upsert?: boolean;
    };
}

export const executeBulkWrite = async (Db: any, bulkOperations: BulkOperation[]) => {
    try {
        await Db.bulkWrite(bulkOperations);
    } catch (e) {
        console.error(e);
        throw new Error('Bulk write operation failed');
    }
};

export const checkObjectId = async (id: string | ObjectId | undefined) => {
    return await isObjectIdOrHexString(id)
}

export const makeObjectId = async (id: string) => {
    return new Types.ObjectId(id)
}

export const findData = async (Db: any, query: object) => {
    return await Db.find(query)
}

export const getUnReadNotifications = async (UserId: ObjectId) => {
    try {
        const notifications = await Notifications.aggregate([
            { $match: { UserId: UserId } },
            {
                $project: {
                    Messages: {
                        $filter: {
                            input: "$Messages",
                            as: "message",
                            cond: { $eq: ["$$message.Seen", false] }
                        }
                    }
                }
            },
            { $unwind: "$Messages" },
            {
                $lookup: {
                    from: "users",
                    localField: "Messages.SenderId",
                    foreignField: "_id",
                    as: "SenderInfo"
                }
            },
            { $unwind: "$SenderInfo" },
            {
                $project: {
                    _id: 1,
                    UserId: 1,
                    Messages: 1,
                    "SenderInfo.Username": 1,
                    "SenderInfo.Profile": 1,
                    "SenderInfo.ProfileLink": 1,
                    "SenderInfo._id": 1
                }
            }
        ])
        return notifications;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export const findUsers = async (userId: { UserId: string, Admin: boolean }[]) => {
    const objectIdArray = userId.map(id => new Types.ObjectId(id.UserId.toString()));
    return await User.find({ _id: { $in: objectIdArray } })
}

export const findUsersObjectId = async (userId: string[]) => {
    const objectIdArray = userId.map(UserId => new Types.ObjectId(UserId.toString()));
    return await User.find({ _id: { $in: objectIdArray } }, { _id: 1 })
}

export const deleteUsingId = async (Db: any, id: string) => await Db.findByIdAndDelete(id)

export const deleteMany = async (db: any, query: object) => {
    return db.deleteMany(query)
}

export const saveData = async (data: Document) => await data.save()

export const likeDislikePost = async (id: ObjectId, value: ObjectId, field1: string, field2: string) => {
    return await Reactions.findByIdAndUpdate(id, { $addToSet: { [field1]: value }, $pull: { [field2]: value } }, { upsert: true })
}

export const likeDislikeVideo = async (id: ObjectId, value: ObjectId, field1: string, field2: string) => {
    return await Reactions.findByIdAndUpdate(id, { $addToSet: { [field1]: value }, $pull: { [field2]: value } }, { upsert: true });
};

export const countDocuments = async (Db: any, id: ObjectId, key: string): Promise<number> => {
    return Db.countDocuments({ [key]: id })
}

export const searchData = async (search: string): Promise<{
    users: UserDocument[],
    post: PostImage[],
    channel: ChannelInterface[]
}> => {
    try {
        const users: UserDocument[] = await findData(User, {
            $or: [
                { Username: { $regex: search, $options: 'i' } },
                { Name: { $regex: search, $options: 'i' } },
            ]
        })
        const posts: PostImage[] = await findData(PostImages, { Hashtags: { $elemMatch: { $regex: search, $options: 'i' } } })
        const channel: ChannelInterface[] = await findData(ChannelModel, { Name: { $regex: search, $options: 'i' } })
        return {
            users,
            post: posts,
            channel
        };
    } catch (error) {
        console.error("Error searching:", error);
        return {
            users: [],
            post: [],
            channel: []
        };
    }
};

export const getCategory = async (search: string | null, skip: number) => {
    const pipeline = [];
    const irx: any = {}
    if (search) {
        irx.Name = { $regex: search, $options: 'i' }
        pipeline.push({
            $match: {
                Name: { $regex: search, $options: 'i' }
            }
        });
    }
    const total = await CategoryModel.countDocuments(irx)
    pipeline.push(
        {
            $skip: skip,
        },
        {
            $limit: 10,
        },
        {
            $lookup: {
                from: "videos",
                foreignField: "RelatedTags",
                localField: "Name",
                as: "videos"
            }
        },
        {
            $project: {
                _id: 1,
                Name: 1,
                CreatedAt: 1,
                Videos: { $size: "$videos" }
            }
        }
    );
    return { category: await CategoryModel.aggregate(pipeline), total }
};


export const getChats = async (userId: ObjectId) => {
    try {
        const data = await Chats.aggregate([
            { $match: { 'Users.UserId': { $in: [userId] } } },
            {
                $lookup: {
                    from: 'messages',
                    localField: 'RoomId',
                    foreignField: 'RoomId',
                    as: 'messages'
                }
            },
            { $unwind: { path: '$messages', preserveNullAndEmptyArrays: true } },
            { $sort: { 'messages._id': -1 } },
            {
                $group: {
                    _id: '$RoomId',
                    latestMessage: { $first: '$messages' },
                    chat: { $first: '$$ROOT' }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    let: { userIds: '$chat.Users.UserId' },
                    pipeline: [
                        { $match: { $expr: { $in: ['$_id', '$$userIds'] } } }
                    ],
                    as: 'userData'
                }
            },
            {
                $project: {
                    _id: 0,
                    RoomId: '$_id',
                    Users: '$chat.Users',
                    users: '$userData',
                    GroupName: '$chat.GroupName',
                    latestMessage: 1,
                    Profile: "$chat.Profile"
                }
            },
            { $sort: { 'latestMessage.Time': -1 } }
        ]);

        return data;
    } catch (e) {
        console.error('Error fetching chats:', e);
        throw e;
    }
};


export const getChat = async (RoomId: string) => {
    try {
        const [data] = await Chats.aggregate([{ $match: { 'RoomId': RoomId } },
        {
            $lookup: {
                from: 'messages',
                localField: 'RoomId',
                foreignField: 'RoomId',
                as: 'messages'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'Users.UserId',
                foreignField: '_id',
                as: 'users'
            }
        }])
        return data;
    } catch (e) {
        return null;
    }
}

export const getFollowers = async (UserId: ObjectId) => {
    try {
        const [response]: ConnectionsInterface[] = await Connections.aggregate([
            { $match: { UserId: UserId } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'Followers',
                    foreignField: '_id',
                    as: 'follow'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'Following',
                    foreignField: '_id',
                    as: 'following'
                }
            },
            {
                $project: {
                    Following: 1,
                    Followers: 1,
                    follow: 1,
                    following: 1,
                    mutual: {
                        $filter: {
                            input: '$follow',
                            as: 'f',
                            cond: {
                                $in: ['$$f._id', '$Following']
                            }
                        }
                    }
                }
            },
            { $addFields: { mutual: { $slice: ['$mutual', 10] } } }
        ]);
        return response;
    } catch (e) {
        console.error('Error fetching followers:', e);
        throw e
    }
}

export const checkChat = async (UserIds: string[]) => {
    try {

        return await Chats.findOne({
            "Users.UserId": {
                $all: UserIds.map((usr) => new Types.ObjectId(usr))
            }
        })
    } catch (e) {
        return null
    }
}

export const getPosts = async (UserIds: ObjectId[], skip: number, limit: number = 12): Promise<PostImage[] | null> => {
    try {
        let match = []
        if (UserIds.length > 2) match.push({ $match: { UserId: { $in: UserIds }, Banned: false, $or: [{ Hidden: { $exists: false } }, { Hidden: false }] } })
        else match.push({ $match: { Banned: false, $or: [{ Hidden: { $exists: false } }, { Hidden: false }] } })
        match.push(
            { $skip: skip },
            { $limit: limit },
            {
                $lookup: {
                    from: 'users',
                    let: { userId: '$UserId' },
                    pipeline: [
                        { $match: { $expr: { $eq: ['$_id', '$$userId'] } } },
                        { $project: { Username: 1, Name: 1, Profile: 1, ProfileLink: 1, _id: 1 } }
                    ],
                    as: 'user'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    let: { tagIds: '$Tags' },
                    pipeline: [
                        { $match: { $expr: { $in: ['$_id', '$$tagIds'] } } },
                        { $project: { Username: 1, Name: 1, Profile: 1, ProfileLink: 1, _id: 1 } }
                    ],
                    as: 'tags'
                }
            },
            {
                $lookup: {
                    from: 'reactions',
                    localField: 'Reactions',
                    foreignField: '_id',
                    as: 'reactions'
                }
            },
            {
                $unwind: {
                    path: '$reactions',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'users',
                    let: { likeIds: '$reactions.Likes' },
                    pipeline: [
                        { $match: { $expr: { $in: ['$_id', '$$likeIds'] } } },
                        { $project: { Username: 1, Name: 1, Profile: 1, ProfileLink: 1, _id: 1 } }
                    ],
                    as: 'reactions.LikesDetails'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    let: { dislikeIds: '$reactions.Dislikes' },
                    pipeline: [
                        { $match: { $expr: { $in: ['$_id', '$$dislikeIds'] } } },
                        { $project: { Username: 1, Name: 1, Profile: 1, ProfileLink: 1, _id: 1 } }
                    ],
                    as: 'reactions.DislikesDetails'
                }
            },
            {
                $addFields: {
                    user: { $arrayElemAt: ['$user', 0] },
                    'reactions.LikesDetails': '$reactions.LikesDetails',
                    'reactions.DislikesDetails': '$reactions.DislikesDetails',
                    tags: '$tags'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    doc: { $mergeObjects: '$$ROOT' },
                    comments: { $push: '$comments' }
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: ['$doc', { comments: '$comments' }]
                    }
                }
            })
        const posts: PostImage[] = await PostImages.aggregate(match);
        console.log(posts)
        return posts;
    } catch (e) {
        console.error('Error fetching posts:', e);
        return null;
    }
};


export const getComments = async (PostId: string) => {
    try {
        const comments = await CommentModel.aggregate([
            { $match: { PostId: new Types.ObjectId(PostId) } },
            {
                $lookup: {
                    from: 'users',
                    let: { userId: '$UserId' },
                    pipeline: [
                        { $match: { $expr: { $eq: ['$_id', '$$userId'] } } },
                        { $project: { Username: 1, Name: 1, Profile: 1, ProfileLink: 1, _id: 1 } }
                    ],
                    as: 'user'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    let: { tagIds: '$Tags' },
                    pipeline: [
                        { $match: { $expr: { $in: ['$_id', '$$tagIds'] } } },
                        { $project: { Username: 1, Name: 1, Profile: 1, ProfileLink: 1, _id: 1 } }
                    ],
                    as: 'tags'
                }
            },
            {
                $addFields: {
                    user: { $arrayElemAt: ['$user', 0] }
                }
            }
        ]);
        return comments;
    } catch (e) {
        console.log(e);
        return [];
    }
};


export const getComment = async (CommentId: ObjectId) => {
    try {
        const comments = await CommentModel.aggregate([
            { $match: { _id: CommentId } },
            {
                $lookup: {
                    from: 'users',
                    let: { userId: '$UserId' },
                    pipeline: [
                        { $match: { $expr: { $eq: ['$_id', '$$userId'] } } },
                        { $project: { Username: 1, Name: 1, Profile: 1, ProfileLink: 1, _id: 1 } }
                    ],
                    as: 'user'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    let: { tagIds: '$Tags' },
                    pipeline: [
                        { $match: { $expr: { $in: ['$_id', '$$tagIds'] } } },
                        { $project: { Username: 1, Name: 1, Profile: 1, ProfileLink: 1, _id: 1 } }
                    ],
                    as: 'tags'
                }
            },
            {
                $addFields: {
                    user: { $arrayElemAt: ['$user', 0] }
                }
            }
        ]);

        console.log(comments);
        return comments;
    } catch (e) {
        console.log(e);
        return [];
    }
};


export const getChannel = async (ChannelId: ObjectId) => {
    try {
        const [response] = await ChannelModel.aggregate([
            {
                $match: { _id: ChannelId }
            },
            {
                $lookup: {
                    from: 'users',
                    let: { userId: '$UserId' },
                    pipeline: [
                        { $match: { $expr: { $eq: ['$_id', '$$userId'] } } },
                        { $project: { Username: 1, Name: 1, Profile: 1, ProfileLink: 1, _id: 1 } }
                    ],
                    as: 'user'
                }
            },
            {
                $lookup: {
                    from: "videos",
                    foreignField: "UserId",
                    localField: "_id",
                    as: "videos"
                }
            },
            {
                $lookup: {
                    from: "shorts",
                    localField: "_id",
                    foreignField: "ChannelId",
                    as: "shorts"
                }
            },
            {
                $lookup: {
                    from: "lives",
                    localField: "_id",
                    foreignField: "UserId",
                    as: "live"
                }
            },
        ]);
        return response;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const getShorts = async (ids: string[]) => {
    try {
        const total = await ShortVideos.countDocuments({ Banned: false, "Settings.Private": false })
        if (total === ids.length) return {
            total, shorts: []
        }
        const shorts = await ShortVideos.aggregate([
            {
                $match: { Banned: false, "Settings.Private": false, VideoLink: { $nin: ids } }
            },
            {
                $sample: { size: total }
            },
            {
                $limit: 10
            },
            {
                $project: {
                    VideoLink: 1
                }
            }
        ])
        console.log(shorts)
        return {
            shorts: shorts.map((value: any) => value.VideoLink), total
        }
    } catch (e) {
        return {
            total: 0,
            shorts: []
        }
    }
}


