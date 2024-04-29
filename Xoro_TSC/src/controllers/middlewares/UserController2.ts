import { Request, Response, NextFunction } from 'express';
// import * as secure from '../other/SecureData'
import * as UserEntity from "../interfaces/UserInterfaces";
import * as UseCases from '../../applications/usecases/UserProfile'
import * as AuthResponses from '../../applications/responses/Interfaces/UserResponsesInterface';
interface CustomRequest extends Request {
    result?: AuthResponses.VerifyUserAuthResponse;
}

type Middleware = (req: CustomRequest, res: Response, next: NextFunction) => void;


export const EditBanner: Middleware = async (req, res) => {
    try {
        const result = req.result
        const Image = req.file
        const data = await UseCases.EditBanner({ Image, user: result?.user })
        return res.status(data.status).json(data)
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const EditProfilePic: Middleware = async (req, res) => {
    try {
        const result = req.result
        const Image = req.file
        const data = await UseCases.EditProfilePic({ Image, user: result?.user })
        return res.status(data.status).json(data)
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const SecureAccount: Middleware = async (req, res) => {
    try {
        const result = req.result
        const { Password } = req.body
        const data = await UseCases.SecureAccount({ user: result?.user, Password })
        return res.status(data.status).json(data)
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const ProfileSettings: Middleware = async (req, res) => {
    try {
        const result = req.result
        const { Notification, Private, ProfileLock }: UserEntity.ProfileSettings = req.body
        const data = await UseCases.ProfileSettings({ user: result?.user, Notification, Private, ProfileLock })
        return res.status(data.status).json(data)
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const EditProfile: Middleware = async (req, res) => {
    try {
        const result = req.result
        const { Name, Username, Gender, Age, Country, Description } = req.body
        const data = await UseCases.EditProfile({ user: result?.user, Name, Username, Gender, Age, Country, Description })
        return res.status(data.status).json(data)
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const FollowUser: Middleware = async (req, res) => {
    try {
        const result = req.result
        const { UserId } = req.params
        const data = await UseCases.FollowUser({ user: result?.user, UserId })
        return res.status(data.status).json(data)
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const UnFollowUser: Middleware = async (req, res) => {
    try {
        const result = req.result
        const { UserId } = req.params
        const data = await UseCases.UnFollowUser({ user: result?.user, UserId })
        return res.status(data.status).json(data)
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const SearchUser: Middleware = async (req, res) => {
    try {
        const result = req.result
        const { Search } = req.body
        // const decode: any = await secure.verifyPayloadSecure(token)
        const data = await UseCases.SearchUser({ user: result?.user, Search })
        // const encode: string = await secure.createPayloadSecure(data)
        return res.status(data.status).json(data)
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const GetProfile: Middleware = async (req, res) => {
    try {
        const result = req.result
        const { Profilelink } = req.params
        const data = await UseCases.GetUserProfile({ user: result?.user, Profilelink })
        return res.status(data.status).json(data)
    } catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}