import { uploadShortsToMQ } from "../../functions/MQ"
import * as ShortsEntity from "../../../entities/RequestInterface/ShortsInterface"
import * as Responses from "../../../entities/ResponseInterface/ShortsResponseInterface"
import * as ResponseFunctions from "../../responses/ShortsResponse"
import * as DatabaseFunctions from "../../functions/DatabaseFunctions"
import ShortVideos from "../../../frameworks/database/models/Shorts"
import { shortsUpload } from "../../../frameworks/mq/interfaces/shortsUpload"
import Reactions from "../../../frameworks/database/models/Reactions"
export const uploadShortsRepository: Function = async ({ Caption, Context, Hashtags, Link, file, user, CommentsOn, Private }: ShortsEntity.uploadShorts) => {
    try {
        const shorts = new ShortVideos({
            Caption,
            Context, Hashtags, ChannelId: user.Channel, UploadDate: new Date(),VideoLink:Link ,Key: Link, Settings: { CommentsOn, Private }
        })

        await shorts.save()
        await Promise.all([
            await uploadShortsToMQ(<shortsUpload>{
                key: Link,
                userId: user._id,
                video: file,
                videoId: shorts._id,
                channelId:user.Channel
            }),
            await DatabaseFunctions.insertData(Reactions, { PostId: shorts._id })
        ])
        return ResponseFunctions.uploadShortsRes(<Responses.uploadShortsResponse>{ message: "Video Uploading", status: 200 })
    } catch (e) {
        return ResponseFunctions.uploadShortsRes(<Responses.uploadShortsResponse>{ message: "Internal Server Error", status: 500 })
    }
}