import * as interfaces from "../Interfaces/VideoResponseInterface";

export const uploadVideoRes:Function = (data:interfaces.uploadVideoResponse) => {
    return <interfaces.uploadVideoResponse>{
        message: data.message,
        status: data.status,
    }
}

