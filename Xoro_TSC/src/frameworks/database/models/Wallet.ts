import { model, Schema, Types } from "mongoose";
import WalletInterface from "../../../entities/ModelsInterface/Wallet";

const walletSchema = new Schema<WalletInterface>({
    UserId:Types.ObjectId,
    Balance:{
        type:Number,
        default:0,
    },
})


const Wallet = model<WalletInterface>("wallets",walletSchema);
export default Wallet;