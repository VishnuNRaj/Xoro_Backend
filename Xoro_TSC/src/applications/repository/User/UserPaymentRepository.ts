import * as PaymentEntity from "../../../entities/RequestInterface/PaymentInterface"
import * as DatabaseFunctions from "../../functions/DatabaseFunctions";
import * as Responses from "../../../entities/ResponseInterface/PaymentResponseInterface"
import Vouchers from "../../../frameworks/database/models/Vouchers";
import VoucherInterface from "../../../entities/ModelsInterface/Vouchers";
import Payment from "../../../frameworks/database/models/Transactions"
import razorpay from "../../../config/razorpay";
import ChannelModel, { Premium } from "../../../frameworks/database/models/Channels";
import { ChannelInterface, PremiumUsersInterface } from "../../../entities/ModelsInterface/Channels";
import { TransactionInterface } from "../../../entities/ModelsInterface/Wallet";
import { transactionSave, walletadmin } from "../../functions/UserFunctions";
import Live from "../../../frameworks/database/models/Live";
import LiveInterface from "../../../entities/ModelsInterface/Live";
import User from "../../../frameworks/database/models/User";
import UserDocument from "../../../entities/ModelsInterface/User";

export const PremiumRepository = async ({ PaymentId, Type, user }: PaymentEntity.Premium) => {
    try {
        const response = await razorpay.capture({ paymentId: PaymentId })
        if (!response?.status) return <Responses.Premium>{
            message: response?.message,
            status: 201
        }
        const voucher: VoucherInterface = await DatabaseFunctions.findUsingId(Vouchers, Type)
        if (!voucher && response) {
            const { capture } = response
            await razorpay.refund({ paymentId: PaymentId, amount: parseInt(capture.amount.toString()), currency: "INR" })
            return <Responses.Premium>{
                message: "Invalid Credentials",
                status: 201
            }
        }
        user.VIP = true;
        user.Premium.Date = new Date();
        user.Premium.Type = voucher.Type;
        user.Premium.Till = new Date();
        const end = new Date(user.Premium.Till.setMonth(user.Premium.Date.getMonth() + voucher.Months)).toLocaleDateString()
        user.Premium.Till = new Date(end)
        const transactions = await transactionSave(<TransactionInterface>{
            Amount: voucher.Price,
            PaymentId,
            Through: "Razorpay",
            State: "Captured",
            Type: "Premium",
        })
        transactions.Sender = user._id;
        await Promise.all([
            await DatabaseFunctions.saveData(transactions),
            await DatabaseFunctions.saveData(user),
            await walletadmin(voucher.Price, transactions._id),
        ])
        return <Responses.Premium>{
            message: `Premium Purchase Successfull`,
            status: 200,
            user: user
        }
    } catch (e) {
        return <Responses.Premium>{
            message: "Internal Server Error",
            status: 500
        }
    }
}

export const JoinNow = async ({ ChannelId, user, PaymentId }: PaymentEntity.JoinNow) => {
    try {
        const channel: ChannelInterface = await DatabaseFunctions.findUsingId(ChannelModel, ChannelId)
        if (!channel) return <Responses.JoinNow>{
            message: "Invalid Credentials",
            status: 201,
        };
        const [premium, response]: [PremiumUsersInterface, any] = await Promise.all([
            await DatabaseFunctions.findUsingId(Premium, channel.UserId.toString()),
            await razorpay.capture({ paymentId: PaymentId })
        ])
        if (!response?.status) return <Responses.Premium>{
            message: response?.message,
            status: 201
        };
        if (premium.Price > parseInt(response.capture.amount.toString())) {
            return <Responses.Premium>{
                message: "Invalid Amount Sent",
                status: 201
            }
        }
        const transactions = await transactionSave(<TransactionInterface>{
            Amount: premium.Price,
            PaymentId,
            Through: "Razorpay",
            State: "Captured",
            Type: "Content",
        })
        transactions.Sender = user._id;
        transactions.Reciever = channel.UserId;
        await Promise.all([
            await DatabaseFunctions.saveData(transactions),
            await walletadmin((premium.Price * 40) / 100, transactions._id)
        ])
    } catch (e) {
        return <Responses.Premium>{
            message: "Internal Server Error",
            status: 500
        }
    }
}

export const SuperChatRepository = async ({ Amount, LiveId, PaymentId, UserId }: PaymentEntity.SuperChat) => {
    try {
        const live: LiveInterface = await DatabaseFunctions.findUsingId(Live, LiveId)
        if (!live) return <Responses.Premium>{
            message: "Invalid Credentials",
            status: 201
        };
        const user: UserDocument = await DatabaseFunctions.findOneData(User, { Channel: live.UserId })
        const response = await razorpay.capture({ paymentId: PaymentId })
        const Price = response?.capture.amount as number;
        if (Amount > Price) return <Responses.Premium>{
            message: "Invalid Payment",
            status: 201
        };
        if (!response?.status) return <Responses.Premium>{
            message: response?.message,
            status: 201
        };
        const transactions = await transactionSave(<TransactionInterface>{
            Amount: Price,
            PaymentId,
            Through: "Razorpay",
            State: "Captured",
            Type: "Superchat",
        })
        transactions.Sender = UserId;
        transactions.Reciever = user._id;
        await Promise.all([
            await DatabaseFunctions.saveData(transactions),
            await walletadmin((Price * 40) / 100, transactions._id)
        ])
        return <Responses.Premium>{
            message: "Superchat Sent",
            status: 200
        }
    } catch (e) {
        return <Responses.Premium>{
            message: "Internal Server Error",
            status: 500
        }
    }
}

