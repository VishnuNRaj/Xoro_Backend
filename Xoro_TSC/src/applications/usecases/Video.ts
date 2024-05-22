import * as Validations from '../validations/VideoValidations';
import * as VideoEntity from './../../controllers/interfaces/VideoInterface';
import * as Responses from '../responses/Interfaces/VideoResponseInterface';
import * as Repository from '../repository/Video/UserVideoRepository';
import * as UserFunctions from '../functions/UserFunctions';
import { uploadFileToFirebase } from '../../config/firebase';

export const uploadVideo: Function = async (data: VideoEntity.uploadVideo): Promise<Responses.uploadVideoResponse> => {
    try {
        const errors: {
            errors: string;
            status: boolean;
        } = await Validations.uploadVideoValidate(data)
        if (!errors.status) {
            return <Responses.uploadVideoResponse>{
                message: errors.errors,
                status: 400,
            }
        }
        const Links = {
            Video: await uploadFileToFirebase(data.Video, `/videos/${data.user._id}`),
            Thumbnail: await UserFunctions.uploadBase64Image(data.Thumbnail)
        }
        return Repository.uploadVideoRepository({ ...data, Links: Links })
    } catch (e) {
        return <Responses.uploadVideoResponse>{
            message: 'Internal Server Error',
            status: 500,
        }
    }
}
