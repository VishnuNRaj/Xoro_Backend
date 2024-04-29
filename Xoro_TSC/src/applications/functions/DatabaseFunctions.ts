import { isObjectIdOrHexString } from 'mongoose'
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

export const findOneAndUpdate = async (Db: any, query: object, update: object, options: object) => {
    return await Db.findOneAndUpdate(
        query, update, options
    );
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

export const deleteUsingId: Function = async (Db: any, id: string) => {
    return await Db.findByIdAndDelete(id)
}