import { model, Schema, Types } from "mongoose";
import { TransactionInterface } from "../../../entities/ModelsInterface/Wallet";

const transactionSchema = new Schema<TransactionInterface>({
    Through: { type: String, enum: ['Wallet', 'Stripe', 'Razorpay'] },
    Amount: { type: Number, required: true },
    Time: { type: Date, default: Date.now },
    Sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    Reciever: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    Type: { type: String, required: true },
    paymentid: { type: String, required: true },
    State: { type: String, enum: ['Captured', 'Refunded'], required: true }
});

const Payment = model<TransactionInterface>("payments",transactionSchema)
export default Payment;