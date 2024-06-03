"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const Redis_1 = __importDefault(require("../../database/Redis"));
const videoUploadWorker_1 = __importDefault(require("../worker/videoUploadWorker"));
videoUploadWorker_1.default.on('completed', (job) => {
    console.log(`Completed ${job.id}`);
});
const VideoUploadQueue = new bullmq_1.Queue('videoupload', {
    connection: Redis_1.default,
});
VideoUploadQueue.on('waiting', () => {
    console.log('VideoUploadQueue is ready and connected to Redis');
});
exports.default = VideoUploadQueue;
