"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePresignedUrl = void 0;
const dotenv_1 = require("dotenv");
const fs_1 = __importDefault(require("fs"));
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
(0, dotenv_1.config)();
const s3Credentials = {
    region: process.env.AWS_ACCESS_REGION || '',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET || '',
    },
};
const s3 = new client_s3_1.S3Client(s3Credentials);
const expiresIn = 60 * 60 * 24 * 7 - 1;
function uploadVideoToS3(bucketName, video, key) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fileStream = fs_1.default.createReadStream(video.path);
            const uploadParams = {
                Bucket: bucketName,
                Key: key,
                Metadata: {
                    type: video.mimetype,
                },
                Body: fileStream,
            };
            const uploadCommand = new client_s3_1.PutObjectCommand(uploadParams);
            yield s3.send(uploadCommand);
            const url = yield generatePresignedUrl(bucketName, key);
            return url;
        }
        catch (err) {
            console.error("Error uploading video:", err);
            return null;
        }
    });
}
exports.default = uploadVideoToS3;
function generatePresignedUrl(bucketName, objectKey) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const command = new client_s3_1.GetObjectCommand({
                Bucket: bucketName,
                Key: objectKey,
            });
            const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3, command, { expiresIn: expiresIn });
            return url;
        }
        catch (err) {
            console.error("Error generating presigned URL:", err);
            throw err;
        }
    });
}
exports.generatePresignedUrl = generatePresignedUrl;
