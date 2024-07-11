import * as Responses from '../../entities/ResponseInterface/PostUserResponseInterface';
import * as Repository from '../repository/Post/UserPostRepository';
import * as PostEntity from '../../entities/RequestInterface/PostInterface';
import { uploadFileToFirebase } from '../../config/firebase';


export const AddPost: Function = async ({ Caption, CommentsOn, Hashtags, Hidden, Media, Tags, user }: PostEntity.addImagesPost) => {
    try {
        if (!Media || Media.length === 0) {
            return <Responses.addPostResponse>{
                message: 'No Images Provided',
                status: 201
            }
        }
        const result = await Promise.all(Media.map(async (media: Express.Multer.File) => {
            const link: string = await uploadFileToFirebase(media, `posts/${user.id}/${Date.now()}`)
            return {
                postType: media.mimetype.split('/')[0],
                link: link
            };
        }));
        return await Repository.addPostImagesRepository({ Caption, CommentsOn, Hashtags, Hidden, Images: result, Tags, user })
    } catch (e) {
        return <Responses.addPostResponse>{
            message: 'Internal Server Error',
            status: 500
        }
    }
}

export const ShowPost: Function = async ({ user }: PostEntity.showPostImages) => {
    try {
        return await Repository.showPostImagesRepository({ user })
    } catch (e) {
        return
    }
}

export const DeletePost: Function = async ({ PostId, user }: PostEntity.deletePost) => {
    try {
        if (!PostId || typeof PostId !== 'string' || PostId.length === 0) {
            return <Responses.deletePostResponse>{
                message: 'Invalid Credentials',
                status: 201
            }
        }
        return await Repository.deletePostRepository({ PostId, user })
    } catch (e) {
        return <Responses.deletePostResponse>{
            message: 'Internal Server Error',
            status: 500
        }
    }
}

export const LikePost: Function = async ({ PostId, UserId }: PostEntity.LikePost) => {
    try {
        if (typeof PostId !== 'string' || PostId.length === 0) {
            return <Responses.deletePostResponse>{
                message: 'Invalid Credentials',
                status: 201
            }
        }
        return await Repository.LikePostRepository({ PostId, UserId })
    } catch (e) {
        return <Responses.deletePostResponse>{
            message: 'Internal Server Error',
            status: 500
        }
    }
}

export const DislikePost: Function = async ({ PostId, UserId }: PostEntity.LikePost) => {
    try {
        if (typeof PostId !== 'string' || PostId.length === 0) {
            return <Responses.deletePostResponse>{
                message: 'Invalid Credentials',
                status: 201
            }
        }
        return await Repository.DislikePostRepository({ PostId, UserId })
    } catch (e) {
        return <Responses.deletePostResponse>{
            message: 'Internal Server Error',
            status: 500
        }
    }
}

export const RemoveReactions: Function = async ({ PostId, UserId }: PostEntity.LikePost) => {
    try {
        if (typeof PostId !== 'string' || PostId.length === 0) {
            return <Responses.deletePostResponse>{
                message: 'Invalid Credentials',
                status: 201
            }
        }
        return await Repository.RemoveReactions({ PostId, UserId })
    } catch (e) {
        return <Responses.deletePostResponse>{
            message: 'Internal Server Error',
            status: 500
        }
    }
}

export const GetPosts: Function = async ({ UserId, skip }: PostEntity.getPost) => {
    try {
        if (isNaN(skip)) {
            return <Responses.getPostResponse>{
                message: "Invalid Properties",
                status: 201,
                post: [],
            }
        }
        return await Repository.getPostsRepository({ UserId, skip })
    } catch (e) {
        console.log(e)
        return <Responses.getPostResponse>{
            message: "Internal Server Error",
            status: 500,
        }
    }
}

export const ReportPost: Function = ({Content,Message,PostId,UserId}:PostEntity.ReportPost) => {
    try {
        
    } catch (e) {
        return <Responses.reportPostResponse>{
            message:"Internal Server Error",
            status:500,
        }
    }
}