import * as interfaces from "../../../controllers/interfaces/SearchInterface";
import * as Responses from "../../responses/Interfaces/SearchResponsInterface";
import * as ResponseFunctions from "../../responses/Response/SearchResponse";
import * as DatabaseFunctions from "../../functions/DatabaseFunctions"
import User from "../../../frameworks/database/models/User";
import UserDocument from "../../../entities/User";
import { PostImage } from "../../../entities/PostImages";
export const SearchRepository:Function = async ({Search}:interfaces.searchData):Promise<Responses.searchDataResponse> => {
    try {
        const response:{
            user: UserDocument[],
            post: PostImage[],
        } = await DatabaseFunctions.searchData(Search)
        return ResponseFunctions.searchDataRes(<Responses.searchDataResponse>{
            data:null,
            message: 'Internal Server Error',
            status: 500,
        })
    } catch (e) {
        return ResponseFunctions.searchDataRes(<Responses.searchDataResponse>{
            data:null,
            message: 'Internal Server Error',
            status: 500,
        })
    }
}