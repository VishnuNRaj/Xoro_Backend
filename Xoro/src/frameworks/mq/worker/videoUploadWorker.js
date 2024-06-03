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
const bullmq_1 = require("bullmq");
const UserFunctions_1 = require("../../../applications/functions/UserFunctions");
const SocketEmits_1 = require("../../../controllers/Socket/SocketEmits");
const s3bucket_1 = __importDefault(require("../../../config/s3bucket"));
const Redis_1 = __importDefault(require("../../database/Redis"));
Redis_1.default.on('connect', () => {
    console.log('Connected');
});
const uploadVideo = (_a) => __awaiter(void 0, [_a], void 0, function* ({ key, userId, video, bucket, thumbnail, videoId }) {
    try {
        const response = yield (0, s3bucket_1.default)(bucket, video, key);
        const notification = {
            SenderId: userId,
            Link: thumbnail,
            Time: new Date(),
            Message: response ? 'Video Uploaded Successfully' : 'Video Upload Failed',
        };
        yield (0, UserFunctions_1.createNotification)(notification, userId);
        yield (0, SocketEmits_1.emitNotification)({
            Message: notification.Message,
            SenderId: '',
            Link: notification.Link,
        });
        if (response) {
            yield (0, UserFunctions_1.updateVideoLink)(videoId, response);
        }
        return response;
    }
    catch (e) {
        console.error('Error in uploadVideo:', e);
        return null;
    }
});
const worker = new bullmq_1.Worker('videoupload', (job) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Processing job:', job.id);
    yield uploadVideo(job.data);
}), {
    connection: Redis_1.default,
});
worker.on('ready', () => {
    console.log('Worker is ready and connected to Redis');
});
worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed successfully`);
});
worker.on('failed', (job, err) => {
    console.log(`Job ${job === null || job === void 0 ? void 0 : job.id} failed with error: ${err.message}`);
});
exports.default = worker;
