import * as Responses from '../../entities/ResponseInterface/LiveResponseInterface';
import * as Repository from '../repository/Live/UserLiveRepository';
import * as LiveEntity from '../../entities/RequestInterface/LiveInterface';
import { uploadFileToFirebase } from '../../config/firebase';
import * as DatabaseFunctions from '../functions/DatabaseFunctions';
import { ObjectId } from 'mongoose';
import UserDocument from '../../entities/ModelsInterface/User';
import { generateVerificationLink } from '../functions/CommonFunctions';

export const createLive = async ({ Caption, Description, RelatedTags, Restriction, Thumbnail, user,Hashtags }: LiveEntity.createLive) => {
    try {
        if (!Thumbnail.mimetype.startsWith("image/")) return <Responses.createLiveResponse>{
            message: "Invalid Thumbnail",
            status: 201
        }
        const Link = await uploadFileToFirebase(Thumbnail, `/live`);
        const Key = generateVerificationLink()
        return await Repository.createLive(<LiveEntity.createLive>{ Caption, Description, RelatedTags, Restriction, user, Link, Key,Hashtags })
    } catch (e) {
        return <Responses.createLiveResponse>{
            message: "Internal Server Error",
            status: 500
        }
    }
}