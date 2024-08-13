import { model, Schema, Types } from "mongoose";
import { TransactionInterface } from "../../../entities/ModelsInterface/Wallet";
import Wallet from "./Wallet";
import { Premium } from "./Channels";
import { WalletAdmin } from "./Admin";

const transactionSchema = new Schema<TransactionInterface>({
    Through: { type: String, enum: ['Wallet', 'Stripe', 'Razorpay'] },
    Amount: { type: Number, required: true },
    Time: { type: Date, default: Date.now },
    Sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    Reciever: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    Type: { type: String, required: true },
    PaymentId: { type: String, required: true },
    State: { type: String, enum: ['Captured', 'Refunded'], required: true },
    Expense: {
        type: Number,
        default: 0
    },
});

transactionSchema.post("save", async (data) => {
    try {
        const sender = data.Sender && data.Through === "Wallet" ? await Wallet.findById(data.Sender) : null
        const reciever = data.Reciever ? await Wallet.findById(data.Reciever) : null
        if (sender) {
            sender.Balance -= data.Amount
            await sender.save()
        }
        if (reciever) {
            if (data.Type !== "Premium" && data.Type !== "Advertisement") {
                data.Expense = (data.Amount * 40) / 100;
            }
            reciever.Balance += data.Amount - data.Expense;
            await reciever.save()
        }
        if (data.Type === "Premium") {
            const premium = await Premium.findById(data.Sender)
            if (!premium) {
                await Premium.insertMany([{ _id: data.Sender, ChannelId: data.Sender, Price: 99 }])
            }
        }
        await data.save()
    } catch (e) {
        console.log(e)
    }
})

const Payment = model<TransactionInterface>("payments", transactionSchema)
export default Payment;