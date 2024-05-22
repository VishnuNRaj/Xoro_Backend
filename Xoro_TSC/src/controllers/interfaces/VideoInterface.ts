import UserDocument from "../../entities/User";

export interface uploadVideo {
    Caption: string;
    Video: Express.Multer.File;
    Thumbnail: string;
    Duration: string;
    Settings: {
        CommentsOn: boolean;
        ReactionsOn: boolean;
        PremiumContent: boolean;
        ListedContent: boolean;
    },
    Restriction: number;
    Hashtags: string[];
    RelatedTags: string;
    user:UserDocument;
    Links:{
        Video:string,
        Thumbnail:string,
    },
    Description:string,
}


