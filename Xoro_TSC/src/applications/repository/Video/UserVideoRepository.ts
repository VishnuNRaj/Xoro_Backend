import * as VideoEntity from '../../../controllers/interfaces/VideoInterface';
import * as DatabaseFunctions from '../../functions/DatabaseFunctions'
import UserAuth from '../../../frameworks/database/models/UnverifiedUsers';
import * as ResponseFunctions from '../../responses/Response/VideoResponse';
import * as Responses from '../../responses/Interfaces/VideoResponseInterface';
import UnverifiedUsers from '../../../entities/UnverifiedUsers';
import { UploadFile } from './../../functions/UserFunctions';
import { compare } from 'bcryptjs';
import User from './../../../frameworks/database/models/User';
import * as CommonFunctions from '../../functions/CommonFunctions';
import { ConnectionsInterface } from '../../../entities/Connections';
import Connections from './../../../frameworks/database/models/Connetions';
import UserDocument from '../../../entities/User';
import PostVideo from '../../../entities/Videos';
import Videos from '../../../frameworks/database/models/Videos'
import Reactions from '../../../frameworks/database/models/Reactions'
import CommentsModel from '../../../frameworks/database/models/Comments'


export const uploadVideoRepository: Function = async ({ Caption, Duration, Hashtags, RelatedTags, Description, Restriction, Settings, Links, user }: VideoEntity.uploadVideo): Promise<Responses.uploadVideoResponse> => {
    try {

        const [video]: PostVideo[] = await DatabaseFunctions.insertData(Videos, {
            Caption: Caption,
            UserId: user._id,
            Duration: Duration,
            Hashtags: Hashtags,
            RelatedTags: RelatedTags,
            Restriction: Restriction,
            Settings: Settings,
            Thumbnail: Links.Thumbnail,
            Video: Links.Video,
            Postdate: new Date(),
            Description: Description,
            VideoLink: CommonFunctions.generateVerificationLink()
        })
        await Promise.all([
            await DatabaseFunctions.insertData(Reactions, {
                PostId: video._id
            }),
            await DatabaseFunctions.insertData(CommentsModel, {
                PostId: video._id
            })
        ])


        return ResponseFunctions.uploadVideoRes(<Responses.uploadVideoResponse>{
            message: 'Video uploaded Sucessfully',
            status: 200
        })
    } catch (e) {
        return ResponseFunctions.uploadVideoRes(<Responses.uploadVideoResponse>{
            message: 'Error uploading video',
            status: 500
        })
    }
}