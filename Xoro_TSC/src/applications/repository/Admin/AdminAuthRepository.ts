import * as AdminEntity from '../../../entities/RequestInterface/AdminInterface';
import * as DatabaseFunctions from '../../functions/DatabaseFunctions'
import * as ResponseFunctions from '../../responses/AdminResponse';
import * as Responses from '../../../entities/ResponseInterface/AdminResponseInterface';
import * as CommonFunctions from '../../functions/CommonFunctions';
import { SendVerificationOTP } from '../../functions/SendMail';
import { CreatePayload, VerifyPayload, VerifyPayloadAdmin } from '../../functions/JWT';
import Admin from '../../../frameworks/database/models/Admin';
import AdminDocument from '../../../entities/ModelsInterface/Admin';



export const AdminLoginRepository: Function = async ({ Email, Password }: AdminEntity.AdminLogin): Promise<Responses.AdminLoginResponse> => {
    try {
        const admin: AdminDocument = await DatabaseFunctions.findOneData(Admin, { Email: Email });
        if (!admin) {
            return ResponseFunctions.AdminLoginRes(<Responses.AdminLoginResponse>{
                errors: [],
                message: 'No Account Detected',
                status: 202
            })
        }
        if (! await CommonFunctions.ComparePassword(Password, admin.Password)) {
            return ResponseFunctions.AdminLoginRes(<Responses.AdminLoginResponse>{
                errors: [],
                message: 'Incorrect Password',
                status: 202
            })
        }
        const VerificationLink = CommonFunctions.OTPgenerate()
        console.log(VerificationLink)
        await SendVerificationOTP(Email, VerificationLink)
        const LinkTimeout: Date = CommonFunctions.CalculateTime(2)
        await DatabaseFunctions.updateById(Admin, admin._id, { VerificationLink: VerificationLink, LinkTimeout: LinkTimeout })
        return ResponseFunctions.AdminLoginRes(<Responses.AdminLoginResponse>{
            errors: [],
            message: 'A Otp Has Been Send To The Registered Email Address',
            status: 200,
            admin: admin
        })
    } catch (e) {
        console.log(e)
        return ResponseFunctions.AdminLoginRes(<Responses.AdminLoginResponse>{
            errors: [],
            message: 'Internal Server Error',
            status: 500
        })
    }
}


export const AdminOTPVerifyRepository: Function = async ({ OTP, UserId, RememberMe }: AdminEntity.AdminOTP): Promise<Responses.AdminOTPResponse> => {
    try {
        const result = await DatabaseFunctions.checkObjectId(UserId)
        if (!result) {
            return ResponseFunctions.AdminOTPVerifyRes(<Responses.AdminOTPResponse>{
                message: 'Invalid Link',
                status: 202
            })
        }
        const admin: AdminDocument = await DatabaseFunctions.findOneData(Admin, { _id: UserId })
        if (!admin) {
            return ResponseFunctions.AdminOTPVerifyRes(<Responses.AdminOTPResponse>{
                message: 'Invalid Link',
                status: 202
            })
        }
        const currentDate = new Date()
        if (OTP !== admin.VerificationLink) {
            return ResponseFunctions.AdminOTPVerifyRes(<Responses.AdminOTPResponse>{
                message: 'Invalid OTP',
                status: 202
            })
        }
        if (currentDate > new Date(admin.LinkTimeout)) {
            return ResponseFunctions.AdminOTPVerifyRes(<Responses.AdminOTPResponse>{
                message: 'OTP Expired',
                status: 203
            })
        }
        const token: string = await CreatePayload({
            Payload: {
                UserId: admin._id,
                Email: admin.Email,
                Admin: true
            }, RememberMe: RememberMe
        })
        return await ResponseFunctions.AdminOTPVerifyRes(<Responses.AdminOTPResponse>{
            message: 'OTP Verified',
            admin: admin,
            status: 200,
            token
        })
    } catch (e) {
        console.log(e)
        return ResponseFunctions.AdminOTPVerifyRes(<Responses.AdminOTPResponse>{
            errors: [],
            message: 'Internal Server Error',
            status: 500
        })
    }
}

export const ResendOTPRepository: Function = async ({ UserId }: AdminEntity.AdminResendOTP): Promise<Responses.AdminOTPResendResponse> => {
    try {
        const result = await DatabaseFunctions.checkObjectId(UserId)
        if (!result) {
            return ResponseFunctions.AdminResendOTPRes(<Responses.AdminOTPResendResponse>{
                message: 'Invalid Link',
                status: 202
            })
        }
        const admin: AdminDocument = await DatabaseFunctions.findUsingId(Admin, UserId)
        if (!admin) {
            return ResponseFunctions.AdminResendOTPRes(<Responses.AdminOTPResendResponse>{
                message: 'Invalid Link',
                status: 202
            })
        }
        const VerificationLink = CommonFunctions.OTPgenerate()
        await SendVerificationOTP(admin.Email, VerificationLink)
        const LinkTimeout: Date = CommonFunctions.CalculateTime(2)
        await DatabaseFunctions.updateById(Admin, admin._id, { VerificationLink: VerificationLink, LinkTimeout: LinkTimeout })
        return ResponseFunctions.AdminResendOTPRes(<Responses.AdminOTPResendResponse>{
            message: 'A Otp Has Been Send To The Registered Email Address',
            status: 200
        })
    } catch (e) {
        console.log(e)
        return ResponseFunctions.AdminResendOTPRes(<Responses.AdminOTPResendResponse>{
            message: 'Internal Server Error',
            status: 500
        })
    }
}

export const VerifyAdminRepository: Function = async ({ token }: AdminEntity.AdminVerifyAuth): Promise<Responses.AdminVerifyAuthResponse> => {
    try {
        const result: any = await VerifyPayloadAdmin(token)
        console.log(result)
        if (!result.status) {
            return await ResponseFunctions.AdminVerifyAuthRes(<Responses.AdminVerifyAuthResponse>{
                message: result.error,
                status: 202
            })
        }
        if (!result.user.Admin) {
            return await ResponseFunctions.AdminVerifyAuthRes(<Responses.AdminVerifyAuthResponse>{
                message: 'Invalid Credentials',
                status: 202
            })
        }
        const admin: AdminDocument = await DatabaseFunctions.findUsingId(Admin, result.user.UserId)
        if (!admin) {
            return ResponseFunctions.AdminVerifyAuthRes(<Responses.AdminVerifyAuthResponse>{
                message: 'No User Found',
                status: 202
            })
        }
        return ResponseFunctions.AdminVerifyAuthRes(<Responses.AdminVerifyAuthResponse>{
            message: 'Verified SucessFully',
            status: 200,
            admin: admin
        })
    } catch (e) {
        return <Responses.AdminVerifyAuthResponse>{
            message: 'Internal Server Error',
            status: 500
        }
    }
}

