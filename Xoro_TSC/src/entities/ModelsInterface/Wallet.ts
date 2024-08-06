import { Document, ObjectId } from "mongoose";

export default interface WalletInterface extends Document {
    UserId: ObjectId;
    Balance: number;
    Withdrawal: {
        Amount: number;
        Time: Date;
        Balance: number;
    }[]
}

export interface TransactionInterface extends Document {
    Through: "Wallet" | "Stripe" | "Razorpay"
    Amount: number;
    Time: Date;
    Sender: ObjectId;
    Reciever: ObjectId;
    Recieved: boolean;
    Type: string;
    paymentid: string;
    State: "Captured" | "Refunded";
}