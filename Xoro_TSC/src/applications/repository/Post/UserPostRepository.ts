import * as DatabaseFunctions from "../../functions/DatabaseFunctions";
import * as Responses from "../../responses/Interfaces/PostUserResponseInterface";
import * as ResponseFunctions from "../../responses/Response/PostResponse";
import * as CommonFunctions from "../../functions/CommonFunctions";
import * as PostEntity from "../../../controllers/interfaces/PostInterface";
import { PostImage, Post } from "../../../entities/PostImages";
import PostImages from "../../../frameworks/database/models/ImagesPost";
import User from './../../../frameworks/database/models/User';
import UserDocument from "../../../entities/User";


export const addPostImagesRepository: Function = async ({ Caption, CommentsOn, Hashtags, Hidden, Images, Tags, user }: PostEntity.addImagesPost) => {
    try {
        let post: PostImage | null = null
        const userData: UserDocument = await DatabaseFunctions.findUsingId(User, user._id)
        if (userData.Images) post = await DatabaseFunctions.findUsingId(PostImages, userData.Images)
        else {
            post = new PostImages({
                UserId: user._id,
                Posts: []
            })
            await DatabaseFunctions.updateById(User, user._id, { Images: post._id })
        }
        const newPost: Post = {
            Caption: Caption,
            CommentsOn: CommentsOn,
            Hashtags: Hashtags,
            Hidden: Hidden,
            Images: Images,
            Postdate: new Date(),
            Tags: Tags,
            Comments: 0,
            Dislikes: 0,
            Likes: 0,
            ShowReactions: true,
            ShareLink: CommonFunctions.generateVerificationLink(),
        };
        if (post) {
            post.Posts.push(newPost)
            await post.save()
            user.Posts+=1
            await user.save()
        }
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
        let Images: PostImage | null = null
        if (!user.Images) {
            Images = new PostImages({
                UserId: user._id,
                Posts: []
            })
            await Images.save()
            user.Images = Images._id
            await user.save()

        } else Images = await DatabaseFunctions.findUsingId(PostImages, user.Images)

        return ResponseFunctions.showPostRes(<Responses.showImagesResponse>{
            message: 'Verified',
            post: Images?.Posts,
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