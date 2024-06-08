import cloudinaryv2 from '../../config/cloudinary';
import { UploadApiResponse } from 'cloudinary';
import fs from 'fs';
import UnverifiedUsers from '../../entities/ModelsInterface/UnverifiedUsers';
import UserDocument from '../../entities/ModelsInterface/User';
import firebase from '../../config/firebase'
import { Bucket } from '@google-cloud/storage';
import mongoose, { ObjectId } from 'mongoose';
import Notifications from '../../frameworks/database/models/Notifications'
import { findOneAndUpdate, updateById } from './DatabaseFunctions';
import { Notification } from '../../entities/ModelsInterface/Notification';
import Videos from '../../frameworks/database/models/Videos';
import PostVideo from '../../entities/ModelsInterface/Videos';


export const UploadFile: Function = async (file: Express.Multer.File) => {
    try {
        const fileBuffer = fs.readFileSync(file.path);
        const fileString = fileBuffer.toString('base64');
        const result: UploadApiResponse = await cloudinaryv2.uploader.upload(`data:${file.mimetype};base64,${fileString}`, {
            folder: 'User Profile'
        });
        fs.unlinkSync(file.path);
        return result.secure_url;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export const uploadBase64Image: Function = async (base64Image: string) => {
    try {
        const result = await cloudinaryv2.uploader.upload(base64Image, {
            folder: 'Post_Images',
        });
        return result.secure_url;
    } catch (error) {
        console.error('Error uploading image:', error);
        return 'Internal Server Error'
    }
};


export const VerifyUser: Function = async (user: UnverifiedUsers | UserDocument) => {
    try {
        if (!user) return { message: "No User Found", status: false };
        if (user.Terminated) return { message: "Account Terminated", status: false };
        if (user.Suspended) {
            const currentDate = new Date()
            if (user.SuspendedTill && user.SuspendedTill > currentDate) {
                return { message: "Account Suspended", status: false };
            } else {
                user.Suspended = false;
                user.SuspendedTill = undefined;
                await user.save();
            }
        }
        return { message: "User Verified", status: true };
    } catch (e) {
        return {
            message: 'Internal Server Error',
            status: false,
        }
    }
}


export const uploadToFirebase: Function = async (file: Express.Multer.File, path: string): Promise<string> => {
    try {
        const store: Bucket = firebase.storage().bucket()
        const buffer: Buffer = fs.readFileSync(file.path);
        await store.file(path).save(buffer, {
            metadata: {
                contentType: file.mimetype
            }
        })
        console.log(store.file(path))
        const data = store.file(path);
        const signedUrl = await data.getSignedUrl({
            action: 'read',
            expires: Date.now() + 15 * 60 * 1000,
        });
        console.log('Signed URL:', signedUrl);
        fs.unlinkSync(file.path);
        return signedUrl[0];
    } catch (e: any) {
        console.log(e);
        return e.message;
    }
};

export const createNotification: Function = async (data: Notification, UserId: ObjectId) => {
    try {
        await findOneAndUpdate(Notifications, { UserId: UserId }, { $push: { Messages: data } }, {})
        return true;
    } catch (e) {
        return false
    }
}

export const updateVideoLink: Function = async (videoId: string, link: string) => {
    try {
        await updateById(Videos, videoId, { Video: link, Uploaded: true })
        return true
    } catch (e) {
        return false
    }
}
export const getRandomVideos = async (skip: number, random: number): Promise<PostVideo[]> => {
    try {
        const totalVideos = await Videos.countDocuments();
        const randomOffset = random === 0 ? Math.floor(Math.random() * totalVideos) : random;

        const videos:PostVideo[] = await Videos.aggregate([
            { $sample: { size: totalVideos } },
            { $skip: randomOffset + skip },
            { $limit: 10 },
            {$lookup:{
                from:'channels',
                localField:'UserId',
                foreignField:'_id',
                as:'Channel'
            }},
            {$lookup:{
                from:'reactions',
                localField:'_id',
                foreignField:'PostId',
                as:'Reactions'
            }},
        ]);

        return videos;
    } catch (error) {
        console.error('Error fetching random videos:', error);
        throw error;
    }
};
