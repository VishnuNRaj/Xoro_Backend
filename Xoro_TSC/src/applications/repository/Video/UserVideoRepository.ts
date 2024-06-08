import * as VideoEntity from '../../../entities/RequestInterface/VideoInterface';
import * as DatabaseFunctions from '../../functions/DatabaseFunctions'
import { videoUpload } from '../../../frameworks/mq/interfaces/videoUpload'
import UserAuth from '../../../frameworks/database/models/UnverifiedUsers';
import * as ResponseFunctions from '../../responses/VideoResponse';
import * as Responses from '../../../entities/ResponseInterface/VideoResponseInterface';
import UnverifiedUsers from '../../../entities/ModelsInterface/UnverifiedUsers';
import { getRandomVideos, UploadFile } from './../../functions/UserFunctions';
import VideoUpload from '../../../frameworks/mq/queue/videoUploadQueue'
// import { compare } from 'bcryptjs';
// import User from './../../../frameworks/database/models/User';
import * as CommonFunctions from '../../functions/CommonFunctions';
// import { ConnectionsInterface } from '../../../entities/Connections';
// import Connections from './../../../frameworks/database/models/Connetions';
import UserDocument from '../../../entities/ModelsInterface/User';
import PostVideo from '../../../entities/ModelsInterface/Videos';
import Videos from '../../../frameworks/database/models/Videos'
import Reactions from '../../../frameworks/database/models/Reactions'
import CommentsModel from '../../../frameworks/database/models/Comments'
import { uploadVideoToMQ } from '../../functions/MQ'
import { generatePresignedUrl } from '../../../config/s3bucket';

export const uploadVideoRepository: Function = async ({ Caption, Video, Duration, Hashtags, RelatedTags, Description, Restriction, Settings, Links, user }: VideoEntity.uploadVideo): Promise<Responses.uploadVideoResponse> => {
    try {

        const [video]: PostVideo[] = await DatabaseFunctions.insertData(Videos, {
            Caption: Caption,
            UserId: user.Channel,
            Duration: Duration,
            Hashtags: Hashtags,
            RelatedTags: RelatedTags,
            Restriction: Restriction,
            Settings: Settings,
            Thumbnail: Links.Thumbnail,
            Video: Links.Video,
            Postdate: new Date(),
            Description: Description,
            VideoLink: CommonFunctions.generateVerificationLink(),
            Key: Links.Video,
        })

        await Promise.all([
            await uploadVideoToMQ(<videoUpload>{
                key: Links.Video,
                thumbnail: Links.Thumbnail,
                userId: user._id,
                videoId: video._id,
                video: Video
            }),
            await DatabaseFunctions.insertData(Reactions, {
                PostId: video._id
            }),
            await DatabaseFunctions.insertData(CommentsModel, {
                PostId: video._id
            })
        ])


        return ResponseFunctions.uploadVideoRes(<Responses.uploadVideoResponse>{
            message: 'Video uploaded Sucessfully',
            status: 200
        })
    } catch (e) {
        console.log(e)
        return ResponseFunctions.uploadVideoRes(<Responses.uploadVideoResponse>{
            message: 'Error uploading video',
            status: 500
        })
    }
}


export const getVideoRepository: Function = async (user: UserDocument | null, skip: number, random: number): Promise<Responses.getVideosResponse> => {
    try {
        const videoData: PostVideo[] = await getRandomVideos(skip, random)
        console.log(videoData)
        const today = new Date()
        const updated:PostVideo[] = videoData.map((video) => {
            const date = new Date(video.Postdate)
            date.setDate(date.getDate() + 7);
            if (today > date) {
                generatePresignedUrl('xoro-stream.online', video.Key).then((url:string)=>{
                    video.Video = url
                })
            }
            return video
        })
        return ResponseFunctions.getVideoRes(<Responses.getVideosResponse>{
            message: 'Found',
            status: 200,
            user: user,
            Videos: updated,
        })
    } catch (e) {
        console.log(e);
        return ResponseFunctions.getVideoRes(<Responses.getVideosResponse>{
            message: 'Internal Server Error',
            status: 500,
            user: user
        })
    }
}