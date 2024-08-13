import * as Responses from '../../entities/ResponseInterface/PaymentResponseInterface';
import * as Repository from '../repository/User/UserPaymentRepository';
import * as PaymentEntity from '../../entities/RequestInterface/PaymentInterface';
import * as DatabaseFunctions from '../functions/DatabaseFunctions';

export const Premium = async ({ Type, PaymentId, user }: PaymentEntity.Premium) => {
    try {
        if (!DatabaseFunctions.checkObjectId(Type)) {
            return <Responses.Premium>{
                message: "Invalid Credentials",
                status: 201
            }
        }
        return await Repository.PremiumRepository({ Type, PaymentId, user })
    } catch (e) {
        return <Responses.Premium>{
            message: "Internal Server Error",
            status: 500
        }
    }
}

export const JoinNow = async ({ PaymentId, user, ChannelId }: PaymentEntity.JoinNow) => {
    try {
        if (!DatabaseFunctions.checkObjectId(ChannelId)) {
            return <Responses.Premium>{
                message: "Invalid Credentials",
                status: 201
            }
        }
        return await Repository.JoinNow({ PaymentId, user, ChannelId })
    } catch (e) {
        return <Responses.Premium>{
            message: "Internal Server Error",
            status: 500
        }
    }
}

export const SuperChat = async ({ PaymentId, UserId, Amount, LiveId }: PaymentEntity.SuperChat) => {
    try {
        if (!DatabaseFunctions.checkObjectId(LiveId)) {
            return <Responses.Premium>{
                message: "Invalid Credentials",
                status: 201
            }
        }
        return await Repository.SuperChatRepository({ PaymentId, UserId, Amount, LiveId })
    } catch (e) {
        return <Responses.Premium>{
            message: "Internal Server Error",
            status: 500
        }
    }
}