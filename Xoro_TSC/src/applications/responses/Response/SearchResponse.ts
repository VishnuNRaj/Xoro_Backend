import * as interfaces from "../Interfaces/SearchResponsInterface";

export const searchDataRes:Function = (data:interfaces.searchDataResponse):interfaces.searchDataResponse => {
    return <interfaces.searchDataResponse>{
        data: data.data,
        message: data.message,
        status: data.status,
    }
}