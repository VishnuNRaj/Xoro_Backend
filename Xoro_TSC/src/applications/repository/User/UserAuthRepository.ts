import * as UserEntity from '../../../controllers/interfaces/UserInterfaces';
import * as DatabaseFunctions from '../../functions/DatabaseFunctions'
import UserAuth from '../../../frameworks/database/models/UnverifiedUsers';
import * as ResponseFunctions from '../../responses/Response/UserResponse';
import * as Responses from '../../responses/Interfaces/UserResponsesInterface';
import * as CommonFunctions from '../../functions/CommonFunctions';
import UnverifiedUsers from '../../../entities/UnverifiedUsers';
import { SendVerificationLink, SendVerificationOTP } from '../../functions/SendMail';
import { CreatePayload, VerifyPayload } from '../../functions/JWT';
import User from '../../../frameworks/database/models/User';
import auth from '../../../config/auth'
import UserDocument from '../../../entities/User';
import { VerifyUser } from '../../functions/UserFunctions';
import Connections from '../../../frameworks/database/models/Connetions';
import { ConnectionsInterface } from '../../../entities/Connections';
import Notifications from '../../../frameworks/database/models/Notifications';
// import { ObjectId } from 'mongodb';

export const RegisterRepository: Function = async (data: UserEntity.Register): Promise<Responses.SignUpResponse> => {
    try {
        const { Name, Email, Phone, Type, Profile }: UserEntity.Register = data
        let { Password }: UserEntity.Register = data
        const user: UnverifiedUsers = await DatabaseFunctions.findOneData(UserAuth, { Email: Email })
        if (user && user.Verified) {
            return ResponseFunctions.SignupRes(<Responses.SignUpResponse>{
                errors: [],
                status: 202,
                message: 'User Already Exists'
            })
        }
        const LinkTimeout: Date = CommonFunctions.CalculateTime(2)
        const VerificationLink: string = CommonFunctions.generateVerificationLink()
        const link = `${auth.baseLink}/${auth.verifyAccount}/${VerificationLink}/`
        if (user && !user.Verified) {
            await DatabaseFunctions.updateById(UserAuth, user._id, { VerificationLink: VerificationLink, LinkTimeout: LinkTimeout })
            await SendVerificationLink(Email, link + user._id)
            return ResponseFunctions.SignupRes(<Responses.SignUpResponse>{
                errors: [],
                message: 'Already Logged Account Please Verify Account Through Link Shared Via Email',
                status: 200
            })
        }
        const Username = CommonFunctions.generateRandomName('user', 8)
        Password = await CommonFunctions.HashPassword(Password)
        const [Userdata] = await DatabaseFunctions.insertData(UserAuth, { Name, Email, Password, Phone, Username, VerificationLink, LinkTimeout, Profile, Type })
        await SendVerificationLink(Email, link + Userdata._id)
        return ResponseFunctions.SignupRes(<Responses.SignUpResponse>{
            errors: [],
            message: 'A Verification Link Has Been Shared to Your Email',
            status: 200
        })
    } catch (e) {
        console.log(e)
        return ResponseFunctions.SignupRes(<Responses.SignUpResponse>{
            errors: [],
            message: 'Internal Server Error',
            status: 500
        })
    }
}

export const LoginRepository: Function = async ({ Email, Password, Type }: UserEntity.Login): Promise<Responses.LoginResponse> => {
    try {
        console.log(Email, typeof Password, Type)
        const user: UnverifiedUsers = await DatabaseFunctions.findOneData(UserAuth, { Email: Email })
        const userauth: any = await VerifyUser(user)
        if (!userauth.status) {
            return ResponseFunctions.VerityAccountAuthRes(<Responses.VerifyUserAuthResponse>{
                message: userauth.message,
                status: 202,
                user: null
            })
        }
        if (!await CommonFunctions.ComparePassword(Password, user.Password)) {
            return ResponseFunctions.VerityAccountAuthRes(<Responses.VerifyUserAuthResponse>{
                message: 'Incorrect Password',
                status: 202,
                user: null
            })
        }
        let VerificationLink: string = ''
        if (user && !user.Verified) {
            VerificationLink = CommonFunctions.generateVerificationLink()
            const link = `${auth.baseLink}/${auth.verifyAccount}/${VerificationLink}/`
            const LinkTimeout: Date = CommonFunctions.CalculateTime(2)
            await DatabaseFunctions.updateById(UserAuth, user._id, { VerificationLink: VerificationLink, LinkTimeout: LinkTimeout })
            await SendVerificationLink(Email, link + user._id)
            return ResponseFunctions.LoginRes(<Responses.LoginResponse>{
                errors: [],
                message: 'Account Not Yet Verified. Please Verify Account Through Link Shared Via Email',
                status: 204
            })
        }
        if (!user.TwoStepVerification) {
            const token: string = await CreatePayload({ Payload: { UserId: user._id, Email: user.Email }, RememberMe: true })
            return ResponseFunctions.LoginRes(<Responses.LoginResponse>{
                message: token,
                status: 210,
                errors: [],
                user: await DatabaseFunctions.findUsingId(User, user._id)
            })
        }
        VerificationLink = CommonFunctions.OTPgenerate()
        await SendVerificationOTP(Email, VerificationLink)
        const LinkTimeout: Date = CommonFunctions.CalculateTime(2)
        await DatabaseFunctions.updateById(UserAuth, user._id, { VerificationLink: VerificationLink, LinkTimeout: LinkTimeout })
        return ResponseFunctions.LoginRes(<Responses.LoginResponse>{
            errors: [],
            message: 'A Otp Has Been Send To The Registered Email Address',
            status: 200,
            user: user
        })
    } catch (e) {
        return ResponseFunctions.SignupRes(<Responses.LoginResponse>{
            errors: [],
            message: 'Internal Server Error',
            status: 500
        })
    }
}

export const VerifyAccountRepository: Function = async ({ VerificationLink, UserId }: UserEntity.VerifyAccount): Promise<Responses.VerifyAccountResponse> => {
    try {
        const result = await DatabaseFunctions.checkObjectId(UserId)
        console.log(result);

        if (!result) {
            return ResponseFunctions.VerifyAccountRes(<Responses.VerifyAccountResponse>{
                message: 'Invalid Link',
                status: 202
            })
        }
        const user: UnverifiedUsers = await DatabaseFunctions.findUsingId(UserAuth, { _id: UserId })
        console.log(user)
        if (!user || user.Suspended || user.Terminated || user.VerificationLink != VerificationLink || user.Verified) {
            return ResponseFunctions.VerifyAccountRes(<Responses.VerifyAccountResponse>{
                message: 'Invalid Link',
                status: 202
            })
        }
        const currentDate = new Date()
        if (user.LinkTimeout < currentDate) {
            return ResponseFunctions.VerifyAccountRes(<Responses.VerifyAccountResponse>{
                message: 'Link Expired',
                status: 203
            })
        }
        await DatabaseFunctions.updateById(UserAuth, user._id, { Verified: true })
        const ProfileLink = await CommonFunctions.generateVerificationLink()
        const [res]: any[] = await Promise.all([
            await DatabaseFunctions.insertData(Connections, { UserId: user._id }),
            await DatabaseFunctions.insertData(Notifications, {
                UserId: user._id, Messages: [
                    {
                        Message: 'Welcome to Xoro Streams',
                        SenderId: user._id,
                        Link: '',
                        Type: 'Auth'
                    }
                ]
            }),
        ])
        await DatabaseFunctions.insertData(User, <UserDocument>{
            _id: user._id,
            Name: user.Name,
            Username: user.Username,
            Suspended: user.Suspended,
            SuspendedTill: user.SuspendedTill,
            Connections: res[0]._id,
            ProfileLink: ProfileLink,
            Profile: user.Profile,
        })
        const token = await CreatePayload({ Payload: { UserId: user._id, Email: user.Email, Admin: false }, RememberMe: false })
        return ResponseFunctions.VerifyAccountRes(<Responses.VerifyAccountResponse>{
            message: 'Verified Succesfully',
            status: 200,
            token: token,
            user: user,
            data:{
                Message: 'Welcome to Xoro Streams',
                Type: 'Auth',
                SenderId: '',
                Link: '',
            }
        })
    } catch (e) {
        console.log(e)
        return ResponseFunctions.VerifyAccountRes(<Responses.VerifyAccountResponse>{
            message: 'Internal Server Error',
            status: 500
        })
    }
}

export const AddProfilePicRepository: Function = async ({ file }: UserEntity.FilesSend, { Username, RememberMe }: UserEntity.AddProfileData, { UserId }: UserEntity.VerifyAccount): Promise<Responses.AddProfileResponse> => {
    try {
        let result = DatabaseFunctions.checkObjectId(UserId)
        if (!result) {
            return ResponseFunctions.AddProfileRes(<Responses.AddProfileResponse>{
                message: 'Invalid Link',
                status: 202
            })
        }
        let user: UnverifiedUsers = await DatabaseFunctions.findUsingId(UserAuth, UserId)
        if (!user) {
            return ResponseFunctions.AddProfileRes(<Responses.AddProfileResponse>{
                message: 'Invalid Link',
                status: 202,
                token: ''
            })
        }
        const dataFound: UnverifiedUsers = await DatabaseFunctions.findOneData(UserAuth, {
            Username: Username,
            Email: { $ne: user.Email }
        });

        if (dataFound) {
            return ResponseFunctions.AddProfileRes(<Responses.AddProfileResponse>{
                message: 'Username Already Exists',
                status: 202,
                token: ''
            })
        }
        user.Username = Username ? Username : user.Username
        user.Profile = typeof file == 'string' && file != '' ? file : user.Profile
        await DatabaseFunctions.saveData(user)
        await DatabaseFunctions.updateById(User, UserId, { Profile: user.Profile, Username: user.Username })
        const token: string = await CreatePayload({ Payload: { UserId: user._id, Email: user.Email, Admin: false }, RememberMe })
        return ResponseFunctions.AddProfileRes(<Responses.AddProfileResponse>{
            message: 'Uploaded Successfully',
            status: 200,
            token: token,
            user: user
        })
    } catch (e) {
        console.log(e)
        return ResponseFunctions.AddProfileRes(<Responses.AddProfileResponse>{
            message: 'Internal Server Error',
            status: 202,
            token: ''
        })
    }
}

export const OTPVerifyRepository: Function = async ({ OTP, RememberMe }: UserEntity.OTPData, { UserId }: UserEntity.UserIds): Promise<Responses.OTPVerifyResponse> => {
    try {
        const check = DatabaseFunctions.checkObjectId(UserId)
        if (!check) {
            console.log('3')
            return ResponseFunctions.OTPVerifyRes(<Responses.OTPVerifyResponse>{
                message: 'Invalid Link',
                status: 202,
                token: '',
            })
        }
        const user: UnverifiedUsers = await DatabaseFunctions.findUsingId(UserAuth, UserId)
        const auth = await VerifyUser(user)
        if (!auth.status) {
            return ResponseFunctions.VerityAccountAuthRes(<Responses.VerifyUserAuthResponse>{
                message: auth.message,
                status: 202,
                user: null
            })
        }
        if (user.VerificationLink != OTP.toString()) {
            console.log(user.VerificationLink, OTP.toString())
            return ResponseFunctions.OTPVerifyRes(<Responses.OTPVerifyResponse>{
                message: 'Invalid OTP',
                status: 202,
                token: ''
            })
        }
        const currentDate = new Date()
        if (user.LinkTimeout < currentDate) {
            return ResponseFunctions.OTPVerifyRes(<Responses.OTPVerifyResponse>{
                message: 'Link Expired',
                status: 202,
                token: ''
            })
        }
        const token = await CreatePayload({ Payload: { UserId: user._id, Email: user.Email }, RememberMe })
        console.log(token)
        return ResponseFunctions.OTPVerifyRes(<Responses.OTPVerifyResponse>{
            message: 'Verified Succesfully',
            status: 200,
            token: token,
            user: user
        })
    } catch (e) {
        console.log(e)
        return ResponseFunctions.OTPVerifyRes(<Responses.OTPVerifyResponse>{
            message: 'Internal Server Error',
            status: 500,
            token: ''
        })
    }
}

export const verifyUserAuthRepository: Function = async (token: string): Promise<Responses.VerifyUserAuthResponse> => {
    try {
        const result = await VerifyPayload({ token })
        if (!result.status) {
            return ResponseFunctions.VerityAccountAuthRes(<Responses.VerifyUserAuthResponse>{
                message: result.error,
                status: 202,
                user: null
            })
        }
        if (result.Admin) {
            return ResponseFunctions.VerityAccountAuthRes(<Responses.VerifyUserAuthResponse>{
                message: 'Invalid Credentials Found',
                status: 202,
                user: null
            })
        }
        const user: UserDocument = await DatabaseFunctions.findUsingId(User, result.user.UserId)
        const auth = await VerifyUser(user)
        if (!auth.status) {
            return ResponseFunctions.VerityAccountAuthRes(<Responses.VerifyUserAuthResponse>{
                message: auth.message,
                status: 202,
                user: null
            })
        }
        return ResponseFunctions.VerityAccountAuthRes(<Responses.VerifyUserAuthResponse>{
            message: 'Verified Succesfully',
            status: 200,
            user: user
        })
    } catch (e) {
        console.log(e)
        return ResponseFunctions.VerityAccountAuthRes(<Responses.VerifyUserAuthResponse>{
            message: 'Internal Server Error',
            status: 500,
            user: null
        })
    }
}

export const ResendOTP: Function = async ({ UserId }: UserEntity.UserOTP): Promise<Responses.UserOTPResponse> => {
    try {
        const result = await DatabaseFunctions.checkObjectId(UserId)
        if (!result) {
            return ResponseFunctions.ResendOTPRes(<Responses.UserOTPResponse>{
                message: 'Invalid Link',
                status: 202
            })
        }
        const user: UnverifiedUsers = await DatabaseFunctions.findUsingId(UserAuth, UserId)
        const auth = await VerifyUser(user)
        if (!auth.status) {
            return ResponseFunctions.VerityAccountAuthRes(<Responses.VerifyUserAuthResponse>{
                message: auth.message,
                status: 202,
                user: null
            })
        }
        const VerificationLink = CommonFunctions.OTPgenerate()
        await SendVerificationOTP(user.Email, VerificationLink)
        const LinkTimeout = CommonFunctions.CalculateTime(2)
        await DatabaseFunctions.updateById(UserAuth, user._id, { VerificationLink: VerificationLink, LinkTimeout: LinkTimeout })
        return ResponseFunctions.ResendOTPRes(<Responses.UserOTPResponse>{
            message: 'OTP Has Been Send to Registered Email',
            status: 200,
            token: ''
        })
    } catch (e) {
        console.log(e)
        return ResponseFunctions.ResendOTPRes(<Responses.UserOTPResponse>{
            message: 'Internal Server Error',
            status: 500
        })
    }
}


export const getTwoStep: Function = async ({ user }: UserEntity.GetSecurity): Promise<Responses.GetSecurityResponse> => {
    try {
        const { TwoStepVerification }: UnverifiedUsers = await DatabaseFunctions.findUsingId(UserAuth, user._id)
        return ResponseFunctions.GetSecurityRes(<Responses.GetSecurityResponse>{
            message: 'Security Verified',
            status: 200,
            user: user,
            TwoStepVerification: TwoStepVerification
        })
    } catch (e) {
        return ResponseFunctions.GetSecurityRes(<Responses.GetSecurityResponse>{
            message: 'Internal Server Error',
            status: 500,
            user: user,
            TwoStepVerification: false
        })
    }
}

export const setTwoStep: Function = async ({ user }: UserEntity.setSecurity): Promise<Responses.setTwoStepResponse> => {
    try {
        const userData: UnverifiedUsers = await DatabaseFunctions.findUsingId(UserAuth, user)
        userData.TwoStepVerification = !userData.TwoStepVerification
        await DatabaseFunctions.saveData(userData)
        return ResponseFunctions.setTwoStepRes(<Responses.setTwoStepResponse>{
            message: 'Security Verified',
            status: 200,
        })
    } catch (e) {
        return ResponseFunctions.setTwoStepRes(<Responses.setTwoStepResponse>{
            message: 'Internal Server Error',
            status: 500,
        })
    }
}