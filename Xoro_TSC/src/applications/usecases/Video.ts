import * as Validations from '../validations/VideoValidations';
import * as VideoEntity from './../../controllers/interfaces/VideoInterface';
import * as Responses from '../responses/Interfaces/VideoResponseInterface';
import * as Repository from '../repository/Video/UserVideoRepository';
import * as UserFunctions from '../functions/UserFunctions';
import UserDocument from '../../entities/User';

export const uploadVideo: Function = async (data: VideoEntity.uploadVideo): Promise<Responses.uploadVideoResponse> => {
    try {
        // const errors: {
        //     errors: string;
        //     status: boolean;
        // } = await Validations.uploadVideoValidate(data)
        // if (!errors.status) {
        //     return <Responses.uploadVideoResponse>{
        //         message: errors.errors,
        //         status: 400,
        //     }
        // }
        if(!data.user.Channel) return <Responses.uploadVideoResponse>{
            message: 'Create a Channel For Uploading Videos',
            status: 201,
        }
        const Links = {
            Video: `${data.user.Channel}/${new Date()}-${data.Video.originalname}`,
            Thumbnail: await UserFunctions.uploadBase64Image(data.Thumbnail)
        }
        return Repository.uploadVideoRepository({ ...data, Links: Links })
    } catch (e) {
        console.log(e)
        return <Responses.uploadVideoResponse>{
            message: 'Internal Server Error',
            status: 500,
        }
    }
}

export const getVideos: Function = async (user:UserDocument | null,skip:number,random:number) => {
    try {
        if(typeof skip !== 'number') {
            return <Responses.getVideosResponse>{
                user:user,
                message:'Fault Queries',
                status:201,
                Videos:[]
            }
        }
        return Repository.getVideoRepository(user,skip,random)
    } catch (e) {
        return <Responses.getVideosResponse>{
            user:user,
            message:'Internal server Error',
            status:201,
            Videos:[]
        }
    }
}