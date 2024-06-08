import * as Validations from '../validations/UserValidation';
import * as UserEntity from '../../entities/RequestInterface/UserInterfaces';
import * as Responses from '../../entities/ResponseInterface/UserResponsesInterface';
import * as ResponseFunctions from '../responses/UserResponse';
import * as Repository from '../repository/User/UserProfileRepository';
import * as UserFunctions from '../functions/UserFunctions';
import UserDocument from '../../entities/ModelsInterface/User';
import { uploadFileToFirebase } from '../../config/firebase';


export const EditBanner: Function = async ({ user, Image }: UserEntity.EditBanner) => {
    try {
        if (!Image) {
            return ResponseFunctions.EditBannerRes(<Responses.EditBannerResponse>{
                message: 'No Image Provided',
                status: 201
            })
        }
        const result: any = await Validations.ImageValidate(Image)
        if (!result.status) {
            return ResponseFunctions.EditBannerRes(<Responses.EditBannerResponse>{
                message: result.message,
                status: 201
            })
        }
        return Repository.editBannerRepository({ user, Image })
    } catch (e) {
        return <Responses.EditBannerResponse>{
            message: 'Internal Server Error',
            status: 500,
            user: user
        }
    }
}

export const EditProfilePic: Function = async ({ user, Image }: UserEntity.EditProfilePic) => {
    try {
        if (!Image) {
            return ResponseFunctions.EditBannerRes(<Responses.EditProfilePicResponse>{
                message: 'No Image Provided',
                status: 201
            })
        }
        const result: any = await Validations.ImageValidate(Image)
        if (!result.status) {
            return ResponseFunctions.EditBannerRes(<Responses.EditProfilePicResponse>{
                message: result.message,
                status: 201
            })
        }
        return Repository.editProfilePicRepository({ user, Image })
    } catch (e) {
        return <Responses.EditBannerResponse>{
            message: 'Internal Server Error',
            status: 500,
            user: user
        }
    }
}

export const EditProfile: Function = async ({ user, Description, Name, Username }: UserEntity.EditProfileData) => {
    try {
        // const result = await Validations.EditProfileValidate({ Description, Name, Username });
        // if (!result.status) {
        //     return <Responses.EditProfileDataResponse>{
        //         message: result.message,
        //         status: 201,
        //         user: user
        //     }
        // }
        return Repository.EditProfileData({ user, Description, Name, Username })
    } catch (e) {
        console.log(e)
        return <Responses.EditProfileDataResponse>{
            message: 'Internal Server Error',
            status: 500,
            user: user
        }
    }
}

export const SecureAccount: Function = async ({ user, Password }: UserEntity.SecureAccount) => {
    try {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(Password)) {
            return <Responses.SecureAccountResponse>{
                message: 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character',
                status: 201,
                user: user
            }
        }
        return Repository.SecureAccountRepository({ user, Password })
    } catch (e) {
        console.log(e)
        return <Responses.SecureAccountResponse>{
            message: 'Internal Server Error',
            status: 500,
            user: user
        }
    }
}

export const ProfileSettings: Function = async ({ user, Notification, Private, ProfileLock }: UserEntity.ProfileSettings) => {
    try {
        const result = await Validations.ProfileSettingsValidate({ Notification, Private, ProfileLock })
        if (!result.status) {
            return <Responses.ProfileSettingsResponse>{
                message: result.message,
                status: 201,
                user: user
            }
        }
        return Repository.ProfileSettingsRepository({ user, Notification, Private, ProfileLock })
    } catch (e) {
        console.log(e)
        return <Responses.ProfileSettingsResponse>{
            message: 'Internal Server Error',
            status: 500,
            user: user
        }
    }
}

export const SearchUser: Function = async ({ user, Search }: UserEntity.SearchUser) => {
    try {
        console.log(Search)
        if (!Search || typeof Search !== 'string' || Search.length === 0) {
            return ResponseFunctions.SearchUserRes(<Responses.SearchUserResponse>{
                message: 'Invalid Search',
                status: 201,
                user: user,
                users: null,
            })
        }
        return Repository.SearchUserRepository({ user, Search })
    } catch (e) {
        console.log(e)
        return <Responses.SearchUserResponse>{
            message: 'Internal Server Error',
            status: 500,
            user: user,
            users: null
        }
    }
}

export const FollowUser: Function = async ({ user, UserId }: UserEntity.FollowUser) => {
    try {
        if (!UserId || typeof UserId !== 'string' || UserId.length === 0) {
            return <Responses.FollowUserResponse>{
                message: 'Invalid Credentials',
                status: 201,
                user: user
            }
        }
        return Repository.FollowUserRepository({ user, UserId })
    } catch (e) {
        console.log(e)
        return <Responses.FollowUserResponse>{
            message: 'Internal Server Error',
            status: 500,
            user: user
        }
    }
}

export const UnFollowUser: Function = async ({ user, UserId }: UserEntity.UnFollowUser) => {
    try {
        if (!UserId || typeof UserId !== 'string' || UserId.length === 0) {
            return <Responses.UnFollowUserResponse>{
                message: 'Invalid Credentials',
                status: 201,
                user: user
            }
        }
        return Repository.UnFollowUserRepository({ user, UserId })
    } catch (e) {
        console.log(e)
        return <Responses.UnFollowUserResponse>{
            message: 'Internal Server Error',
            status: 500,
            user: user
        }
    }
}

export const GetUserProfile: Function = async ({ user, ProfileLink }: UserEntity.GetUserProfile) => {
    try {
        console.log(ProfileLink)
        if (!ProfileLink || ProfileLink.length === 0) {
            return <Responses.GetProfileResponse>{
                message: 'Invalid Credentials',
                status: 201,
                user: user,
                userData: null,
                post: {
                    Images: []
                }
            }
        }
        return Repository.GetUserProfileRepository({ user, ProfileLink })
    } catch (e) {
        return <Responses.GetProfileResponse>{
            message: 'Internal Server Error',
            status: 500,
            user: user,
            userData: null,
            post: {
                Images: []
            }
        }
    }
}

export const CreateChannel: Function = async ({ Description, Name, Type, Logo }: UserEntity.createChannel, user: UserDocument) => {
    try {
        if (!Name || !Type || !Description) {
            return {
                message: 'Add Channel Name',
                status: 202
            };
        }
        const Link: string = await uploadFileToFirebase(Logo, `/logos/${user._id}/`)
        return Repository.CreateChannelRepository({ Description, Name, Type }, user,Link)
    } catch (e) {
        return <Responses.createChannelResponse>{
            message: 'Internal Server Error',
            status: 500
        }
    }
}