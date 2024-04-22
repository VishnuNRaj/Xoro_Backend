import * as Responses from '../responses/Interfaces/PostUserResponseInterface';
import * as Repository from '../repository/Post/UserPostRepository';
import * as UserFunctions from '../functions/UserFunctions';
import * as PostEntity from '../../controllers/interfaces/PostInterface';


export const AddPost: Function = async ({ Caption, CommentsOn, Hashtags, Hidden, Images, Tags, user }: PostEntity.addImagesPost) => {
    try {
        if (!Images || Images.length === 0) {
            return <Responses.addPostResponse>{
                message: 'No Images Provided',
                status: 201
            }
        }
        const result = await Promise.all(Images.map(async (image: any) => {
            const link: string = await UserFunctions.uploadBase64Image(image);
            return link;
        }));
        return await Repository.addPostImagesRepository({ Caption, CommentsOn, Hashtags, Hidden, Images: result, Tags, user })
    } catch (e) {
        return <Responses.addPostResponse>{
            message: 'Internal Server Error',
            status: 500
        }
    }
}

export const ShowPost:Function = async ({user}:PostEntity.showPostImages) => {
    try {
        if(!user) {
            return <Responses.showImagesResponse>{
                message:'Invalid Credentials',
                status:201
            }
        }
        return await Repository.showPostImagesRepository({user})
    } catch (e) {
        return
    }
}