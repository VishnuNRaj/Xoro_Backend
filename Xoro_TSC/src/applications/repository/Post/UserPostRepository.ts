import * as DatabaseFunctions from "../../functions/DatabaseFunctions";
import * as Responses from "../../responses/Interfaces/PostUserResponseInterface";
import * as ResponseFunctions from "../../responses/Response/PostResponse";
import * as CommonFunctions from "../../functions/CommonFunctions";
import * as PostEntity from "../../../controllers/interfaces/PostInterface";
import PostImages from "../../../frameworks/database/models/ImagesPost";
import Reactions from './../../../frameworks/database/models/Reactions';
import UserDocument from "../../../entities/User";
import { Post } from "../../../entities/PostImages";
import { ReactionsInterface } from "../../../entities/Reactions";
import User from "../../../frameworks/database/models/User";



export const addPostImagesRepository: Function = async ({ Caption, CommentsOn, Hashtags, Hidden, Images, Tags, user }: PostEntity.addImagesPost) => {
    try {
        const newPost = new PostImages({
            Caption: Caption,
            UserId: user._id,
            CommentsOn: CommentsOn,
            Hashtags: Hashtags,
            Hidden: Hidden,
            Images: Images ? Images : [],
            Postdate: new Date(),
            Tags: Tags,
            Comments: 0,
            Dislikes: 0,
            Likes: 0,
            ShowReactions: true,
            ShareLink: CommonFunctions.generateVerificationLink(),
        })
        const [reaction]: ReactionsInterface[] = await DatabaseFunctions.insertData(Reactions, { PostId: newPost._id })
        await Promise.all([
            newPost.Reactions = reaction._id,
            await DatabaseFunctions.saveData(newPost),
            user.Posts += 1,
            await DatabaseFunctions.saveData(user),
        ])
        return ResponseFunctions.addPostRes(<Responses.addPostResponse>{
            message: 'Post Added Successfully',
            status: 200
        })
    } catch (e) {
        console.log(e);
        return ResponseFunctions.addPostRes(<Responses.addPostResponse>{
            message: 'Internal Server Error',
            status: 500
        })
    }
}


export const showPostImagesRepository: Function = async ({ user }: PostEntity.showPostImages): Promise<Responses.showImagesResponse> => {
    try {
        const posts: Post[] = await DatabaseFunctions.findData(PostImages, { UserId: user._id })
        console.log(posts)
        return ResponseFunctions.showPostRes(<Responses.showImagesResponse>{
            message: 'Verified',
            post: posts,
            status: 200,
            user: user
        })
    } catch (e) {
        return ResponseFunctions.showPostRes(<Responses.showImagesResponse>{
            message: 'Internal Server Error',
            post: null,
            status: 500
        })
    }
}

export const deletePostRepository: Function = async ({ PostId, user }: PostEntity.deletePost): Promise<Responses.deletePostResponse> => {
    try {
        const responses = await DatabaseFunctions.checkObjectId(PostId)
        if (!responses) {
            return ResponseFunctions.deletePostRes(<Responses.deletePostResponse>{
                message: 'Invalid Credentials',
                status: 201
            })
        }
        await DatabaseFunctions.deleteUsingId(PostImages, PostId)
        user.Posts = await DatabaseFunctions.countDocuments(PostImages, user._id, 'UserId')
        await DatabaseFunctions.saveData(user)
        return ResponseFunctions.deletePostRes(<Responses.deletePostResponse>{
            message: 'Deleted Successfully',
            status: 200
        })
    } catch (e) {
        return ResponseFunctions.deletePostRes(<Responses.deletePostResponse>{
            message: 'Internal Server Error',
            status: 500
        })
    }
}

export const LikePostRepository: Function = async ({ PostId, UserId }: PostEntity.LikePost): Promise<Responses.deletePostResponse> => {
    try {
        const responses: boolean[] = await Promise.all([
            await DatabaseFunctions.checkObjectId(PostId),
            await DatabaseFunctions.checkObjectId(UserId),
        ])
        if (!responses[0] || !responses[1]) {
            return ResponseFunctions.deletePostRes(<Responses.deletePostResponse>{
                message: 'Invalid Credentials',
                status: 201
            })
        }
        const post: Post = await DatabaseFunctions.findUsingId(PostImages, PostId)
        // 👎
        const result: ReactionsInterface = await DatabaseFunctions.likeDislikePost(Reactions, post.Reactions, UserId, 'Likes', 'Dislikes')
        post.Likes = result.Likes.length
        post.Dislikes = result.Dislikes.length
        await DatabaseFunctions.saveData(post)
        return ResponseFunctions.deletePostRes(<Responses.deletePostResponse>{
            message: '👍',
            status: 200
        })
    } catch (e) {
        return ResponseFunctions.deletePostRes(<Responses.deletePostResponse>{
            message: 'Internal Server Error',
            status: 500
        })
    }
}

export const DislikePostRepository: Function = async ({ PostId, UserId }: PostEntity.LikePost): Promise<Responses.deletePostResponse> => {
    try {
        const responses: boolean[] = await Promise.all([
            await DatabaseFunctions.checkObjectId(PostId),
            await DatabaseFunctions.checkObjectId(UserId),
        ])
        if (!responses[0] || !responses[1]) {
            return ResponseFunctions.deletePostRes(<Responses.deletePostResponse>{
                message: 'Invalid Credentials',
                status: 201
            })
        }
        const post: Post = await DatabaseFunctions.findUsingId(PostImages, PostId)
        const result: ReactionsInterface = await DatabaseFunctions.likeDislikePost(Reactions, post.Reactions, UserId, 'Dislikes', 'Likes')
        post.Likes = result.Likes.length
        post.Dislikes = result.Dislikes.length
        await DatabaseFunctions.saveData(post)
        return ResponseFunctions.deletePostRes(<Responses.deletePostResponse>{
            message: '👎',
            status: 200
        })
    } catch (e) {
        return ResponseFunctions.deletePostRes(<Responses.deletePostResponse>{
            message: 'Internal Server Error',
            status: 500
        })
    }
}

export const RemoveReactions: Function = async ({ PostId, UserId }: PostEntity.LikePost): Promise<Responses.deletePostResponse> => {
    try {
        const responses: boolean[] = await Promise.all([
            await DatabaseFunctions.checkObjectId(PostId),
            await DatabaseFunctions.checkObjectId(UserId),
        ])
        if (!responses[0] || !responses[1]) {
            return ResponseFunctions.deletePostRes(<Responses.deletePostResponse>{
                message: 'Invalid Credentials',
                status: 201
            })
        }
        const post: Post = await DatabaseFunctions.findUsingId(PostImages, PostId)
        const reaction: ReactionsInterface = await DatabaseFunctions.pullReactions(Reactions, post._id, UserId)
        post.Likes = reaction.Likes.length
        post.Dislikes = reaction.Dislikes.length
        await DatabaseFunctions.saveData(post)
        return ResponseFunctions.deletePostRes(<Responses.deletePostResponse>{
            message: 'Removed',
            status: 200
        })
    } catch (e) {
        return ResponseFunctions.deletePostRes(<Responses.deletePostResponse>{
            message: 'Internal Server Error',
            status: 500
        })
    }
}

