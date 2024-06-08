import mongoose, { Document, isObjectIdOrHexString, Mongoose, ObjectId, Types } from 'mongoose'
import UserDocument from '../../entities/ModelsInterface/User'
import { PostImage } from '../../entities/ModelsInterface/PostImages'
import User from '../../frameworks/database/models/User'
import PostImages from '../../frameworks/database/models/ImagesPost'
import Chats from '../../frameworks/database/models/Chat'
import { Chat } from '../../entities/ModelsInterface/Chat'
export const findOneData: Function = async (Db: any, query: object): Promise<any> => {
    return await Db.findOne(query)
}

export const findUsingId: Function = async (Db: any, query: string): Promise<any> => {
    return await Db.findById(query)
}

export const insertData: Function = async (Db: any, data: object): Promise<any> => {
    return await Db.insertMany(data)
}

export const updateById: Function = async (Db: any, id: string, data: object) => {
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

export const pullReactions = async (Db: any, id: string, value: string) => {
    return await Db.findByIdAndUpdate(id, {
        $pull: {
            Likes: new mongoose.Types.ObjectId(value),
            Dislikes: new mongoose.Types.ObjectId(value)
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

export const checkObjectId: Function = async (id: string) => {
    return await isObjectIdOrHexString(id)
}

export const findData: Function = async (Db: any, query: object) => {
    return await Db.find(query)
}

export const findUsers: Function = async (userId: string[]) => {
    const objectIdArray = userId.map(id => new Types.ObjectId(id));
    return await User.find({ _id: { $in: objectIdArray } })
}

export const deleteUsingId: Function = async (Db: any, id: string) => {
    return await Db.findByIdAndDelete(id)
}

export const saveData: Function = async (data: Document) => {
    await data.save()
}

export const likeDislikePost: Function = async (Db: any, id: string, value: string, field1: string, field2: string) => {
    return await Db.findByIdAndUpdate(id, { $addToSet: { [field1]: new mongoose.Types.ObjectId(value) }, $pull: { [field2]: new mongoose.Types.ObjectId(value) } }, { new: true })
}

export const countDocuments: Function = async (Db: any, id: ObjectId, key: string): Promise<number> => {
    return Db.countDocuments({ [key]: id })
}

export const searchData = async (search: string): Promise<{
    user: UserDocument[],
    post: PostImage[],
}> => {
    try {
        const users: UserDocument[] = await findData(User, {
            $or: [
                { Username: { $regex: search, $options: 'i' } },
                { Name: { $regex: search, $options: 'i' } },
            ]
        })
        const posts: PostImage[] = await findData(PostImages, { Hashtags: { $elemMatch: { $regex: search, $options: 'i' } } })

        return {
            user: users,
            post: posts
        };
    } catch (error) {
        console.error("Error searching:", error);
        return {
            user: [],
            post: []
        };
    }
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
            { $unwind: { path: '$messages', preserveNullAndEmptyArrays: true } }, // Unwind messages, allowing for empty arrays
            { $sort: { 'messages.Time': -1 } }, // Sort messages by time in descending order
            {
                $group: {
                    _id: '$RoomId',
                    latestMessage: { $first: '$messages' }
                }
            },
            {
                $lookup: {
                    from: 'chats',
                    localField: '_id',
                    foreignField: 'RoomId',
                    as: 'chat'
                }
            },
            { $unwind: '$chat' }, // Unwind the chat array to get a single chat document
            {
                $project: {
                    _id: 0,
                    RoomId: '$_id',
                    Users: '$chat.Users',
                    GroupName: '$chat.GroupName',
                    latestMessage: 1
                }
            }
        ]);

        return data;
    } catch (e) {
        console.error('Error fetching chats:', e);
        throw e;
    }
};
