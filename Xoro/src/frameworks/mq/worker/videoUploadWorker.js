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
const FFmpeg_1 = __importDefault(require("../../system/FFmpeg"));
const fs_1 = __importDefault(require("fs"));
const Redis_1 = __importDefault(require("../../database/Redis"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../../../config/config"));
Redis_1.default.on('connect', () => {
    console.log('Connected');
});
const uploadVideo = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, video, thumbnail, videoId }) {
    try {
        console.log(video.path);
        const videoDir = path_1.default.join(__dirname, '../../../../../Public/videos', userId.toString());
        const videoPath = path_1.default.join(videoDir, `${videoId}.flv`);
        if (!fs_1.default.existsSync(videoDir)) {
            fs_1.default.mkdirSync(videoDir, { recursive: true });
        }
        const fileBuffer = fs_1.default.readFileSync(video.path);
        fs_1.default.writeFileSync(videoPath, fileBuffer);
        console.log(`Video saved at ${videoPath}`);
        const response = yield (0, FFmpeg_1.default)(videoPath, `${config_1.default.RTMP}/videos/${videoId}`, videoId.toString(), true);
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
            yield (0, UserFunctions_1.updateVideoLink)(videoId, `${config_1.default.LIVE}/videos/${videoId}/index.m3u8`);
        }
        return response;
    }
    catch (e) {
        console.error('Error in uploadVideo:', e.message);
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
