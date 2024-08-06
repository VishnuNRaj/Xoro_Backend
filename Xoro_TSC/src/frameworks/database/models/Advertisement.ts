import { model, Schema, Types } from "mongoose";
import AdvertiseInterface from "../../../entities/ModelsInterface/Advertisement";
const adSchema = new Schema<AdvertiseInterface>({
    UserId: Types.ObjectId,
    Date: Date,
    Images: [String],
    Payments: [{
        Date: Date,
        PaymentId: Types.ObjectId,
    }]
})

const Advertisement = model<AdvertiseInterface>('ads', adSchema)
export default Advertisement;