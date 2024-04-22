import { Schema, model } from "mongoose";
import { ConnectionsInterface } from "../../../entities/Connections";


const connectionsSchema = new Schema<ConnectionsInterface>({
    UserId: { type: Schema.Types.ObjectId, required: true },
    Followers: [{ type: Schema.Types.ObjectId }],
    Following: [{ type: Schema.Types.ObjectId }],
    Mutual: [{ type: Schema.Types.ObjectId }]
});

const Connections = model<ConnectionsInterface>('connections', connectionsSchema);

export default Connections;