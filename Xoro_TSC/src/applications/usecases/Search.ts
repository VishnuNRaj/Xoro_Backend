import * as Responses from '../../entities/ResponseInterface/SearchResponsInterface';
import * as ResponseFunctions from '../responses/UserResponse';
import * as Repository from '../repository/Search/SearchRepository';
import * as UserFunctions from '../functions/UserFunctions';


export const searchData: Function = async (search: string) => {
    try {
        if (!search || search.length < 1 || typeof search !== "string") {
            return <Responses.searchDataResponse>{
                data:null,
                message:"Enter Something to Search",
                status:201,
            }
        }
        return await Repository.SearchDataRepository(search)
    } catch (e) {

    }
} 