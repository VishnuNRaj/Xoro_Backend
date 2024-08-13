import { model, Schema, Types } from "mongoose";
import VoucherInterface from "../../../entities/ModelsInterface/Vouchers";

const voucherSchema = new Schema<VoucherInterface>({
    Name: String,
    Description: String,
    Months: {
        type: Number,
        default: 1
    },
    CreatedAt: Date,
    From: Date,
    End: Date,
    Price: Number,
    Type: {
        type: String,
        enum: ["Monthly", "Yearly", "Bi Monthly", "Special"]
    },
    Features: [String],
    Discount: {
        type: Number,
    },
    Thumbnail: String,
})

const Vouchers = model<VoucherInterface>("vouchers", voucherSchema)
export default Vouchers