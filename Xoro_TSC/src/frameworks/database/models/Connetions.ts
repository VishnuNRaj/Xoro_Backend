import { Schema, model } from "mongoose";
import { ConnectionsInterface } from "../../../entities/ModelsInterface/Connections";
import { ObjectId } from 'mongodb';


const connectionsSchema = new Schema<ConnectionsInterface>({
    UserId: { type: ObjectId, required: true },
    Followers: [{ type: ObjectId, default: [] }],
    Following: [{ type: ObjectId, default: [] }],
    Mutual: [{ type: ObjectId, default: [] }],
    FollowRequests: [{ type: ObjectId, default: [] }],
    FollowingRequests: [{ type: ObjectId, default: [] }],
});

const Connections = model<ConnectionsInterface>('connections', connectionsSchema);

export default Connections;