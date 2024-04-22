import { isObjectIdOrHexString } from 'mongoose'
export const findOneData: Function = async (Db: any, query: object): Promise<any> => {
    return await Db.findOne(query)
}

export const findUsingId: Function = async (Db: any, query: string): Promise<any> => {
    return await Db.findById(query)
}

export const insertData: Function = async (Db: any, data: object): Promise<any> => {
    return await Db.insertMany([data])
}

export const updateById: Function = async (Db: any, id: string, data: object) => {
    return await Db.findByIdAndUpdate(id, { $set: data })
}

export const checkObjectId: Function = async (id: string) => {
    return await isObjectIdOrHexString(id)
}

export const findData: Function = async (Db:any,query:object) => {
    return await Db.find(query)
}

export const deleteUsingId: Function = async (Db:any,id:string) =>{
    return await Db.findByIdAndDelete(id)
}