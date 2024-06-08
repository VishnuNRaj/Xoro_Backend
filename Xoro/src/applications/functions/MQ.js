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
exports.uploadVideoToMQ = void 0;
const videoUploadQueue_1 = __importDefault(require("../../frameworks/mq/queue/videoUploadQueue"));
const buckets_1 = __importDefault(require("../../config/buckets"));
const uploadVideoToMQ = (_a) => __awaiter(void 0, [_a], void 0, function* ({ key, thumbnail, userId, video, videoId }) {
    try {
        const res = yield videoUploadQueue_1.default.add('uploadToS3', {
            bucket: buckets_1.default.bucketName,
            key: `${buckets_1.default.Videos}${key}`,
            thumbnail: thumbnail,
            userId: userId,
            video: video,
            videoId: videoId
        });
        // console.log(res)
        return true;
    }
    catch (e) {
        return false;
    }
});
exports.uploadVideoToMQ = uploadVideoToMQ;
