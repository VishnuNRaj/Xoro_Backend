import * as UserEntity from '../../../controllers/interfaces/UserInterfaces';
import * as DatabaseFunctions from '../../functions/DatabaseFunctions'
import UserAuth from '../../../frameworks/database/models/UnverifiedUsers';
import * as ResponseFunctions from '../../responses/Response/UserResponse';
import * as Responses from '../../responses/Interfaces/UserResponsesInterface';
import * as CommonFunctions from '../../functions/CommonFunctions';
import UnverifiedUsers from '../../../entities/UnverifiedUsers';
import { UploadFile } from './../../functions/UserFunctions';
import { compare } from 'bcryptjs';
import User from './../../../frameworks/database/models/User';
import { ConnectionsInterface } from '../../../entities/Connections';
import Connections from './../../../frameworks/database/models/Connetions';
// import { ObjectId } from 'mongodb';
import UserDocument from '../../../entities/User';
import { PostImage } from '../../../entities/PostImages';
import { PostImages } from '../../../controllers/middlewares/PostController';

export const editBannerRepository: Function = async ({ Image, user }: UserEntity.EditBanner) => {
    try {
        const result = await UploadFile(Image);
        if (!result) {
            return ResponseFunctions.EditBannerRes(<Responses.EditBannerResponse>{
                message: 'An Error Occured',
                status: 202,
                user: user
            })
        }
        user.Banner = result
        await user.save()
        return ResponseFunctions.EditBannerRes(<Responses.EditBannerResponse>{
            user: user,
            status: 200,
            message: 'Banner Updated'
        })
    } catch (e) {
        return ResponseFunctions.EditBannerRes(<Responses.EditBannerResponse>{
            user: user,
            status: 500,
            message: 'Internal Server Error'
        })
    }
}

export const editProfilePicRepository: Function = async ({ Image, user }: UserEntity.EditProfilePic) => {
    try {
        const result = await UploadFile(Image);
        if (!result) {
            return ResponseFunctions.EditProfilePicRes(<Responses.EditProfilePicResponse>{
                message: 'An Error Occured',
                status: 202,
                user: user
            })
        }
        user.Profile = result
        console.log('*------------------------------------------------*')
        await user.save()
        await DatabaseFunctions.updateById(UserAuth, user._id, { Profile: result })
        return ResponseFunctions.EditProfilePicRes(<Responses.EditProfilePicResponse>{
            user: user,
            status: 200,
            message: 'Profile Pic Updated'
        })
    } catch (e) {
        return ResponseFunctions.EditProfilePicRes(<Responses.EditProfilePicResponse>{
            user: user,
            status: 500,
            message: 'Internal Server Error'
        })
    }
}

export const SecureAccountRepository = async ({ Password, user }: UserEntity.SecureAccount) => {
    try {
        const userData: UnverifiedUsers = await DatabaseFunctions.findUsingId(UserAuth, user._id)
        if (!await compare(Password, userData.Password)) {
            return ResponseFunctions.SecureAccountRes(<Responses.SecureAccountResponse>{
                message: "Incorrect Password",
                status: 203,
                user: user
            })
        }
        userData.TwoStepVerification = !userData.TwoStepVerification
        await userData.save()
        return ResponseFunctions.SecureAccountRes(<Responses.SecureAccountResponse>{
            user: user,
            status: 200,
            message: "Account Secure"
        })
    } catch (e) {
        return ResponseFunctions.SecureAccountRes(<Responses.SecureAccountResponse>{
            user: user,
            status: 500,
            message: 'Internal Server Error'
        })
    }
}

export const ProfileSettingsRepository: Function = async ({ user, Private, Notification, ProfileLock }: UserEntity.ProfileSettings) => {
    try {
        user.Settings.Private = typeof Private === 'boolean' ? Private : user.Settings.Private
        user.Settings.Notifications = typeof Notification === 'boolean' ? Notification : user.Settings.Notifications
        user.ProfileLock = typeof ProfileLock === 'boolean' ? ProfileLock : user.ProfileLock
        await user.save()
        return ResponseFunctions.SecureAccountRes(<Responses.ProfileSettingsResponse>{
            message: 'Settings Updated',
            user: user,
            status: 200
        })
    } catch (e) {
        return ResponseFunctions.SecureAccountRes(<Responses.ProfileSettingsResponse>{
            message: 'Internal Server Error',
            user: user,
            status: 500
        })
    }
}

export const EditProfileData: Function = async ({ Name, user, Username, Description, Age, Country, Gender }: UserEntity.EditProfileData) => {
    try {
        user.Name = Name;
        user.Username = Username;
        user.Description = Description;
        user.Gender = Gender;
        user.Age = Age;
        user.Country = Country;
        await user.save();
        return ResponseFunctions.EditProfileDataRes(<Responses.EditProfileDataResponse>{
            user: user,
            status: 200,
            message: 'Profile Updated'
        });
    } catch (e) {
        return ResponseFunctions.EditProfileDataRes(<Responses.EditProfileDataResponse>{
            message: 'Internal Server Error',
            user: user,
            status: 500
        });
    }
}

export const FollowUserRepository: Function = async ({ user, UserId }: UserEntity.FollowUser) => {
    try {
        if (!DatabaseFunctions.checkObjectId(UserId)) {
            return ResponseFunctions.UnFollowUserRes(<Responses.UnFollowUserResponse>{
                user: user,
                status: 201,
                message: 'Invalid Credentials'
            })
        }
        const user2: UserDocument = await DatabaseFunctions.findUsingId(User, UserId)

        if (!user2) {
            return ResponseFunctions.FollowUserRes(<Responses.FollowUserResponse>{
                user: user,
                status: 201,
                message: 'Invalid Credentials',
            });
        }
        let userUpdate: any = {
            $addToSet: {
                Following: user2._id,
            }
        }
        let user2Update: any = {
            $addToSet: {
                Followers: user._id,
            }
        }
        if (user2.Settings.Private) {
            userUpdate = {
                $addToSet: {
                    FollowingRequests: UserId
                }
            }
            user2Update = {
                $addToSet: {
                    FollowRequests: user._id
                }
            }
        }
        const result1: ConnectionsInterface = await DatabaseFunctions.updateById(Connections, user2._id, user2Update)
        const result2: ConnectionsInterface = await DatabaseFunctions.updateById(Connections, user._id, userUpdate)
        user.Following = result2.Following.length
        user2.Followers = result1.Followers.length
        await Promise.all([
            await user.save(),
            await user2.save()
        ])

        return ResponseFunctions.FollowUserRes(<Responses.FollowUserResponse>{
            user: user,
            status: 200,
            message: user.Settings.Private ? 'Follow Request Sent' : 'Success'
        });
    } catch (e) {
        console.error(e);
        return ResponseFunctions.FollowUserRes(<Responses.FollowUserResponse>{
            user: user,
            status: 500,
            message: 'Internal Server Error'
        });
    }
};

export const UnFollowUserRepository: Function = async ({ user, UserId }: UserEntity.UnFollowUser) => {
    try {
        if (!DatabaseFunctions.checkObjectId(UserId)) {
            return ResponseFunctions.UnFollowUserRes(<Responses.UnFollowUserResponse>{
                user: user,
                status: 201,
                message: 'Invalid Credentials'
            })
        }
        const result: ConnectionsInterface = await DatabaseFunctions.findOneAndUpdate(
            Connections,
            { UserId: user._id },
            { $pull: { Following: UserId } },
            { new: true, upsert: true }
        );
        const user2: ConnectionsInterface = await DatabaseFunctions.findOneAndUpdate(
            Connections,
            { UserId: UserId },
            { $pull: { Followers: user._id } },
            { new: true, upsert: true }
        );
        user.Following = result.Following.length
        user.Connections = result._id
        await DatabaseFunctions.updateById(User, UserId, { Following: user2.Followers, Connections: user2._id })
        await user.save()
        return ResponseFunctions.UnFollowUserRes(<Responses.UnFollowUserResponse>{
            user: user,
            status: 200,
            message: 'Following'
        })
    } catch (e) {
        return ResponseFunctions.UnFollowUserRes(<Responses.UnFollowUserResponse>{
            message: 'Internal Server Error',
            status: 500,
            user: user
        })
    }
}

export const SearchUserRepository: Function = async ({ user, Search }: UserEntity.SearchUser) => {
    try {
        const result: UserDocument[] = await DatabaseFunctions.findData(User, { Name: { $regex: Search, $options: 'i' } })
        return ResponseFunctions.SearchUserRes(<Responses.SearchUserResponse>{
            user: user,
            message: 'Users Found',
            status: 200,
            users: result,
        })
    } catch (e) {
        return ResponseFunctions.SearchUserRes(<Responses.SearchUserResponse>{
            user: user,
            users: null,
            status: 500,
            message: 'Internal Server Error'
        })
    }
}

export const GetUserProfileRepository: Function = async ({ user, ProfileLink }: UserEntity.GetUserProfile) => {
    try {
        if (!ProfileLink || ProfileLink.length < 32) {
            return ResponseFunctions.GetUserProfileRes(<Responses.GetProfileResponse>{
                user: user,
                status: 201,
                message: 'Invalid Credentials',
                userData: null
            })
        }

        const [userData]: UserDocument[] = await User.aggregate([{ $match: { ProfileLink: ProfileLink } }, {
            $lookup: {
                from: 'connections',
                localField: '_id',
                foreignField: 'UserId',
                as: 'connections'
            }
        }])

        if (!userData) {
            return ResponseFunctions.GetUserProfileRes(<Responses.GetProfileResponse>{
                user: user,
                status: 201,
                message: 'No User Found',
                userData: null
            })
        }

        if (userData.Settings.Private) {
            return ResponseFunctions.GetUserProfileRes(<Responses.GetProfileResponse>{
                user: user,
                status: 201,
                message: 'Private Profile',
                userData: userData,
                post: { Images: [] }
            })
        }

        const post = await Promise.all([
            await DatabaseFunctions.findUsingId(PostImages, userData.Images)
        ])

        return ResponseFunctions.GetUserProfileRes(<Responses.GetProfileResponse>{
            user: user,
            status: 200,
            message: 'User Found',
            userData: userData,
            post: {
                Images: post[0]
            }
        })
    } catch (e) {
        return ResponseFunctions.GetUserProfileRes(<Responses.GetProfileResponse>{
            message: 'Internal Server Error',
            userData: null,
            user: user,
            status: 500
        })
    }
}