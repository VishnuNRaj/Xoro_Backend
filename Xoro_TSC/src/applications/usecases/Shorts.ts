import * as ShortsEntity from "../../entities/RequestInterface/ShortsInterface";
import * as Responses from "../../entities/ResponseInterface/ShortsResponseInterface"
import * as Repository from "../repository/Shorts/UserShortsRepository"
import * as CommonFunctions from "../functions/CommonFunctions"
export const uploadShorts: Function = async ({ Caption, Context, Hashtags, file, user, CommentsOn, Private }: ShortsEntity.uploadShorts) => {
    try {
        if (!file) return <Responses.uploadShortsResponse>{ message: "No video found", status: 201 }
        if (!user.Channel)<Responses.uploadShortsResponse>{ message: "No Channel created", status: 203 }
        const Link = CommonFunctions.generateVerificationLink()
        return await Repository.uploadShortsRepository(<ShortsEntity.uploadShorts>{ Caption, CommentsOn, Context, file,Link, Hashtags, Private, user })
    } catch (e) {
        return <Responses.uploadShortsResponse>{ message: "Internal Server Error", status: 500 }
    }
} 