import UserDocument from "../../entities/User";

export interface addImagesPost {
    Caption: string;
    user: UserDocument;
    Images:string[];
    Tags:string[];
    Hashtags:string[];
    CommentsOn:boolean;
    Hidden:boolean;
}

export interface showPostImages {
    user:UserDocument;
}