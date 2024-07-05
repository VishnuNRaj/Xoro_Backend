import * as Responses from "../../../entities/ResponseInterface/SearchResponsInterface";
import * as ResponseFunctions from "../../responses/SearchResponse"
import * as DatabaseFunctions from "../../functions/DatabaseFunctions"
import UserDocument from "../../../entities/ModelsInterface/User";
import { PostImage } from "../../../entities/ModelsInterface/PostImages";
import { ChannelInterface } from "../../../entities/ModelsInterface/Channels";
export const SearchDataRepository:Function = async (Search:string):Promise<Responses.searchDataResponse> => {
    try {
        const response:{
            users: UserDocument[],
            post: PostImage[],
            channel:ChannelInterface[]
        } = await DatabaseFunctions.searchData(Search)
        return ResponseFunctions.searchDataRes(<Responses.searchDataResponse>{
            data:response,
            message: 'Found',
            status: 200,
        })
    } catch (e) {
        return ResponseFunctions.searchDataRes(<Responses.searchDataResponse>{
            data:null,
            message: 'Internal Server Error',
            status: 500,
        })
    }
}