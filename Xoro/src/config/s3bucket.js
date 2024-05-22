"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const client_s3_1 = require("@aws-sdk/client-s3");
(0, dotenv_1.config)();
const s3Credentilas = {
    region: process.env.AWS_ACCESS_REGION || '',
    credential: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET || '',
    }
};
const s3 = new client_s3_1.S3Client(s3Credentilas);
exports.default = s3;
