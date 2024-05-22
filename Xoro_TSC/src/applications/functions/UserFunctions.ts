import cloudinaryv2 from '../../config/cloudinary';
import { UploadApiResponse } from 'cloudinary';
import fs from 'fs';
import UnverifiedUsers from '../../entities/UnverifiedUsers';
import UserDocument from '../../entities/User';
import firebase from '../../config/firebase'
import { Bucket } from '@google-cloud/storage';
import { ObjectId } from 'mongoose';
import Notifications from '../../frameworks/database/models/Notifications'
import { findOneAndUpdate } from './DatabaseFunctions';
import { PutObjectCommand } from '@aws-sdk/client-s3';


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
        const store:Bucket = firebase.storage().bucket()
        const buffer:Buffer = fs.readFileSync(file.path);
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

export const createNotification:Function = async (data:Notification,UserId:ObjectId) => {
    try {
        await findOneAndUpdate(Notifications,{UserId:UserId},{$push:{Messages:data}},{})
        return true;
    } catch (e) {
        return false
    }
}

