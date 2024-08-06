import { Document, ObjectId } from "mongoose";

export default interface AdvertiseInterface extends Document {
    UserId: ObjectId;
    Date: Date;
    Images: string[];
    Payments: {
        Date: Date;
        PaymentId: ObjectId;
    }[]
}