"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getVideoRepository = exports.uploadVideoRepository = void 0;
const DatabaseFunctions = __importStar(require("../../functions/DatabaseFunctions"));
const ResponseFunctions = __importStar(require("../../responses/VideoResponse"));
const UserFunctions_1 = require("./../../functions/UserFunctions");
// import { compare } from 'bcryptjs';
// import User from './../../../frameworks/database/models/User';
const CommonFunctions = __importStar(require("../../functions/CommonFunctions"));
const Videos_1 = __importDefault(require("../../../frameworks/database/models/Videos"));
const Reactions_1 = __importDefault(require("../../../frameworks/database/models/Reactions"));
const Comments_1 = __importDefault(require("../../../frameworks/database/models/Comments"));
const MQ_1 = require("../../functions/MQ");
const s3bucket_1 = require("../../../config/s3bucket");
const uploadVideoRepository = (_a) => __awaiter(void 0, [_a], void 0, function* ({ Caption, Video, Duration, Hashtags, RelatedTags, Description, Restriction, Settings, Links, user }) {
    try {
        const [video] = yield DatabaseFunctions.insertData(Videos_1.default, {
            Caption: Caption,
            UserId: user.Channel,
            Duration: Duration,
            Hashtags: Hashtags,
            RelatedTags: RelatedTags,
            Restriction: Restriction,
            Settings: Settings,
            Thumbnail: Links.Thumbnail,
            Video: Links.Video,
            Postdate: new Date(),
            Description: Description,
            VideoLink: CommonFunctions.generateVerificationLink(),
            Key: Links.Video,
        });
        yield Promise.all([
            yield (0, MQ_1.uploadVideoToMQ)({
                key: Links.Video,
                thumbnail: Links.Thumbnail,
                userId: user._id,
                videoId: video._id,
                video: Video
            }),
            yield DatabaseFunctions.insertData(Reactions_1.default, {
                PostId: video._id
            }),
            yield DatabaseFunctions.insertData(Comments_1.default, {
                PostId: video._id
            })
        ]);
        return ResponseFunctions.uploadVideoRes({
            message: 'Video uploaded Sucessfully',
            status: 200
        });
    }
    catch (e) {
        console.log(e);
        return ResponseFunctions.uploadVideoRes({
            message: 'Error uploading video',
            status: 500
        });
    }
});
exports.uploadVideoRepository = uploadVideoRepository;
const getVideoRepository = (user, skip, random) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videoData = yield (0, UserFunctions_1.getRandomVideos)(skip, random);
        console.log(videoData);
        const today = new Date();
        const updated = videoData.map((video) => {
            const date = new Date(video.Postdate);
            date.setDate(date.getDate() + 7);
            if (today > date) {
                (0, s3bucket_1.generatePresignedUrl)('xoro-stream.online', video.Key).then((url) => {
                    video.Video = url;
                });
            }
            return video;
        });
        return ResponseFunctions.getVideoRes({
            message: 'Found',
            status: 200,
            user: user,
            Videos: updated,
        });
    }
    catch (e) {
        console.log(e);
        return ResponseFunctions.getVideoRes({
            message: 'Internal Server Error',
            status: 500,
            user: user
        });
    }
});
exports.getVideoRepository = getVideoRepository;
