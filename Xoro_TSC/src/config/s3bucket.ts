import { config } from 'dotenv';
import fs from 'fs';
import { S3Client, S3ClientConfig, PutObjectCommand, PutObjectCommandInput, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
config();

const s3Credentials: S3ClientConfig = {
    region: process.env.AWS_ACCESS_REGION || '',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET || '',
    },
};

const s3 = new S3Client(s3Credentials);
const expiresIn = 60 * 60 * 24 * 7 - 1; 

export default async function uploadVideoToS3(bucketName: string, video: Express.Multer.File, key: string) {
    try {
        const fileStream = fs.createReadStream(video.path);

        const uploadParams: PutObjectCommandInput = {
            Bucket: bucketName,
            Key: key,
            Metadata: {
                type: video.mimetype,
            },
            Body: fileStream,
        };

        const uploadCommand = new PutObjectCommand(uploadParams);
        await s3.send(uploadCommand);
        const url = await generatePresignedUrl(bucketName,key)
        return url
    } catch (err) {
        console.error("Error uploading video:", err);
        return null;
    }
}

export async function generatePresignedUrl(bucketName: string, objectKey: string) {
    try {
        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: objectKey,
        });
        const url = await getSignedUrl(s3, command, { expiresIn: expiresIn });
        return url;
    } catch (err) {
        console.error("Error generating presigned URL:", err);
        throw err;
    }
}

