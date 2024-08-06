import { uploadShortsToMQ } from "../../functions/MQ"
import * as LiveEntity from "../../../entities/RequestInterface/LiveInterface"
import * as Responses from "../../../entities/ResponseInterface/LiveResponseInterface"
import * as DatabaseFunctions from "../../functions/DatabaseFunctions"
import Live from "../../../frameworks/database/models/Live"
import Reactions from "../../../frameworks/database/models/Reactions"
import { ObjectId } from "mongoose"
import LiveInterface from "../../../entities/ModelsInterface/Live"
import { ReactionsInterface } from "../../../entities/ModelsInterface/Reactions";


export const createLive = async ({ Caption, Description, Link, RelatedTags, Restriction, user, Key, Hashtags }: LiveEntity.createLive) => {
    try {
        if (!user.Channel) return <Responses.createLiveResponse>{
            message: "Please Create A Channel",
            status: 201
        };
        const lives: LiveInterface[] = await DatabaseFunctions.findData(Live, { Live: true, UserId: user.Channel })
        if (lives.length > 0) {
            return <Responses.createLiveResponse>{
                message: "Account Already In Live",
                status: 201
            }
        }
        const live = new Live({
            RelatedTags,
            Caption, Description, Thumbnail: Link,
            Key, Restriction, UserId: user.Channel,
            Live: true,
        })
        await DatabaseFunctions.saveData(live)
        await DatabaseFunctions.insertData(Reactions, {
            _id: live._id,
            PostId: live._id
        })
        return <Responses.createLiveResponse>{
            live, message: "Live Created", status: 200
        }
    } catch (e) {
        return <Responses.createLiveResponse>{
            message: "Internal Server Error",
            status: 500
        }
    }
}

// export const startLive = async ({ Key, user }: LiveEntity.startLive) => {
//     try {
//         const lives = await DatabaseFunctions.findData(Live, {
//             $or: [{
//                 Live: true, UserId: user.Channel
//             }, {
//                 Key: Key, Live: true
//             }]
//         })
//         if (lives.length > 0) return <Responses.createLiveResponse>{
//             message: "Account Already In Live or Key Already Used",
//             status: 201
//         }
//         const live = await DatabaseFunctions.findOneData(Live, { Key: Key, UserId: user.Channel })
//         if (!live) return <Responses.createLiveResponse>{
//             message: "Invalid key",
//             status: 201
//         };
//         live.Live = true;
//         await DatabaseFunctions.saveData(live)
//         return <Responses.startLiveResponse>{
//             message: "Live Starting",
//             status: 200
//         }
//     } catch (e) {
//         return <Responses.createLiveResponse>{
//             message: "Internal Server Error",
//             status: 500
//         }
//     }
// }

export const stopLive = async ({ Key, user }: LiveEntity.startLive) => {
    try {
        const lives = await DatabaseFunctions.findData(Live, {
            $or: [{
                Key: Key, Live: true, UserId: { $ne: user.Channel }
            }]
        })
        if (lives.length > 0) return <Responses.createLiveResponse>{
            message: "Invalid Credentials",
            status: 201
        }
        const live = await DatabaseFunctions.findOneData(Live, { Key: Key, UserId: user.Channel })
        if (!live) return <Responses.createLiveResponse>{
            message: "Invalid key",
            status: 201
        };
        live.Live = false;
        live.Completed = true;
        await DatabaseFunctions.saveData(live)
        return <Responses.startLiveResponse>{
            message: "Live Streaming Stopped",
            status: 200
        }
    } catch (e) {
        return <Responses.createLiveResponse>{
            message: "Internal Server Error",
            status: 500
        }
    }
}
