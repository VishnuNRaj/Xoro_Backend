import * as VoucherEntity from "../../../entities/RequestInterface/AdminInterface"
import * as DatabaseFunctions from "../../functions/DatabaseFunctions";
import * as Responses from "../../../entities/ResponseInterface/AdminResponseInterface"
import { uploadNotificationToMQ } from "../../functions/MQ"
import Vouchers from "../../../frameworks/database/models/Vouchers";
import VoucherInterface from "../../../entities/ModelsInterface/Vouchers";
import { createNotification } from "../../functions/UserFunctions";
import { Notification } from "../../../entities/ModelsInterface/Notification";
import User from "../../../frameworks/database/models/User";
import UserDocument from "../../../entities/ModelsInterface/User";
export const addVouchers = async ({ Description, End, Features, From, Months, Name, Price, Type, Thumbnail, Id,Discount }: VoucherEntity.addVouchers) => {
    try {
        const data: VoucherInterface | null = await DatabaseFunctions.findOneData(Vouchers, {
            $or: [{
                Name: Name
            }, {
                Type: Type
            }]
        })
        if (data) return <Responses.addVoucherResponse>{
            message: "Pack Already Exists",
            status: 201,
        };
        const response = new Vouchers({
            Name, Description, Features, From: new Date(From), CreatedAt: new Date(), Price, Months, End: new Date(End), Type,Discount
        })
        const msg = await createNotification(<Notification>{ Message: "A new premium pack for you", Time: new Date, Type: "premium", Link: Thumbnail, SenderId: Id }, Id) as Notification
        const users: UserDocument[] = await DatabaseFunctions.findData(User, { Terminated: false, Suspended: false })
        await Promise.all([
            await DatabaseFunctions.saveData(response),
            await uploadNotificationToMQ({ notification: msg, Text: "New Package Uploaded SuccessFully", type: "premium", userIds: users.map((usr) => usr._id) })
        ])
        return <Responses.addVoucherResponse>{
            message: "Pack Added Successfully",
            status: 200,
            Voucher: response
        }
    } catch (e) {
        return <Responses.addVoucherResponse>{
            message: "Internal Server Error",
            status: 500,
        }
    }
}
export const editVouchers = async (data: VoucherEntity.editVouchers) => {
    try {
        const voucher: VoucherInterface = await DatabaseFunctions.findUsingId(Vouchers, data.id)
        if (!voucher) return <Responses.addVoucherResponse>{
            message: "No Premium Pack Found",
            status: 201,
        };
        const { Description, End, Months, Name, Price, Features } = data
        voucher.Description = Description;
        voucher.Name = Name;
        voucher.End = new Date(End)
        voucher.Months = Months;
        voucher.Features = Features;
        voucher.Price = Price;
        await DatabaseFunctions.saveData(voucher)
        return <Responses.addVoucherResponse>{
            message: "Internal Server Error",
            status: 500,
        }
    } catch (e) {
        return <Responses.addVoucherResponse>{
            message: "Internal Server Error",
            status: 500,
        }
    }
}
export const deleteVouchers = async (id: string) => {
    try {
        await DatabaseFunctions.deleteUsingId(Vouchers, id)
        return <Responses.addVoucherResponse>{
            message: "Deleted Successfully",
            status: 200,
        }
    } catch (e) {
        return <Responses.addVoucherResponse>{
            message: "Internal Server Error",
            status: 500,
        }
    }
}
export const getVouchers = async () => {
    try {
        const voucher = await DatabaseFunctions.findData(Vouchers, {})
        return <Responses.addVoucherResponse>{
            message: "Found",
            status: 200,
            Voucher: voucher
        }
    } catch (e) {
        return <Responses.addVoucherResponse>{
            message: "Internal Server Error",
            status: 500,
        }
    }
}
