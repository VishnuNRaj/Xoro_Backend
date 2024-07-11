import UserDocument from "../ModelsInterface/User";

export interface uploadShorts {
    file:Express.Multer.File;
    Link:string;
    Caption:string;
    Hashtags:string[];
    user:UserDocument;
    Context:string;
    Private:boolean;
    CommentsOn:boolean;
}