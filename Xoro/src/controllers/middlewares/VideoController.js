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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVideo = exports.LikeDislikeRemoveVideo = exports.getVideo = exports.getVideos = exports.uploadVideo = void 0;
const UseCases = __importStar(require("../../applications/usecases/Video"));
const uploadVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = req.result;
        let files = req.file;
        const { Caption, Duration, Hashtags, RelatedTags, Restriction, Settings, Thumbnail, Description } = req.body;
        console.log();
        const data = yield UseCases.uploadVideo({
            Caption,
            Duration,
            Hashtags,
            RelatedTags,
            Restriction,
            Settings,
            Video: files,
            Thumbnail,
            user: result === null || result === void 0 ? void 0 : result.user,
            Description
        });
        return res.status(data.status).json({ data });
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.uploadVideo = uploadVideo;
const getVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = req === null || req === void 0 ? void 0 : req.result;
        const { skip } = req === null || req === void 0 ? void 0 : req.params;
        const { random } = req === null || req === void 0 ? void 0 : req.query;
        if (random && typeof random === 'string' && skip) {
            const data = yield UseCases.getVideos((result === null || result === void 0 ? void 0 : result.user) || null, parseInt(skip), parseInt(random));
            return res.status(data.status).json(data);
        }
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getVideos = getVideos;
const getVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = req === null || req === void 0 ? void 0 : req.result;
        const { VideoLink } = req === null || req === void 0 ? void 0 : req.params;
        const data = yield UseCases.getVideo(VideoLink, result === null || result === void 0 ? void 0 : result.user);
        return res.status(data.status).json(data);
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getVideo = getVideo;
const LikeDislikeRemoveVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = req.result;
        const { VideoId, type } = req.params;
        const array = ["like", "dislike", "remove"];
        if (!array.find((value) => value === type))
            return res.status(201).json({ message: "Invalid Credentials" });
        const data = UseCases.likeDislikeRemove({ VideoId, type, UserId: (_a = result === null || result === void 0 ? void 0 : result.user) === null || _a === void 0 ? void 0 : _a._id });
        return res.status(data.status).json(data);
    }
    catch (e) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.LikeDislikeRemoveVideo = LikeDislikeRemoveVideo;
const deleteVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const result = req.result;
        const { VideoId } = req.params;
        const data = yield UseCases.deleteVideo({ UserId: (_b = result === null || result === void 0 ? void 0 : result.user) === null || _b === void 0 ? void 0 : _b.Channel, VideoId });
        return res.status(data.status).json(data);
    }
    catch (e) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.deleteVideo = deleteVideo;
