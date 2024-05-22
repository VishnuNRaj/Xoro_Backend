import UserDocument from "../../entities/User";

export interface addImagesPost {
    Caption: string;
    user: UserDocument;
    Images?:{
        postType:string,
        link:string;
    }[];
    Media:Express.Multer.File[]
    Tags:string[];
    Hashtags:string[];
    CommentsOn:boolean;
    Hidden:boolean;
}

export interface showPostImages {
    user:UserDocument;
}

export interface deletePost {
    PostId:string;
    user:UserDocument;
}

export interface LikePost {
    PostId:string;
    user:UserDocument;
    UserId:string;
}