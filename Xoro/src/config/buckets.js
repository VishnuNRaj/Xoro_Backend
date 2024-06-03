"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const bucketConfig = {
    bucketName: process.env.AWS_ACCESS_BUCKET_NAME || '',
    Live: 'live/',
    Videos: 'videos/'
};
exports.default = bucketConfig;
