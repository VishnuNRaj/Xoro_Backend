import * as interfaces from "../../entities/ResponseInterface/SearchResponsInterface";

export const searchDataRes:Function = (data:interfaces.searchDataResponse):interfaces.searchDataResponse => {
    return <interfaces.searchDataResponse>{
        data: data.data,
        message: data.message,
        status: data.status,
    }
}