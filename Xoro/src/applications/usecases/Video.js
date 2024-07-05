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
exports.getVideo = exports.getVideos = exports.uploadVideo = void 0;
const Repository = __importStar(require("../repository/Video/UserVideoRepository"));
const UserFunctions = __importStar(require("../functions/UserFunctions"));
const uploadVideo = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const errors: {
        //     errors: string;
        //     status: boolean;
        // } = await Validations.uploadVideoValidate(data)
        // if (!errors.status) {
        //     return <Responses.uploadVideoResponse>{
        //         message: errors.errors,
        //         status: 400,
        //     }
        // }
        if (!data.user.Channel)
            return {
                message: 'Create a Channel For Uploading Videos',
                status: 201,
            };
        const Links = {
            Video: `${data.user.Channel}/${new Date()}-${data.Video.originalname}`,
            Thumbnail: yield UserFunctions.uploadBase64Image(data.Thumbnail)
        };
        return Repository.uploadVideoRepository(Object.assign(Object.assign({}, data), { Links: Links }));
    }
    catch (e) {
        console.log(e);
        return {
            message: 'Internal Server Error',
            status: 500,
        };
    }
});
exports.uploadVideo = uploadVideo;
const getVideos = (user, skip, random) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (typeof skip !== 'number') {
            return {
                user: user,
                message: 'Fault Queries',
                status: 201,
                Videos: []
            };
        }
        return Repository.getVideosRepository(user, skip, random);
    }
    catch (e) {
        return {
            user: user,
            message: 'Internal server Error',
            status: 201,
            Videos: []
        };
    }
});
exports.getVideos = getVideos;
const getVideo = (VideoLink, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!VideoLink || VideoLink.length < 32) {
            return {
                message: 'Fault Queries',
                status: 201,
                user: user
            };
        }
        return yield Repository.getVideoRepository(VideoLink, user);
    }
    catch (e) {
        return {
            message: 'Internal server Error',
            status: 201,
            user: user
        };
    }
});
exports.getVideo = getVideo;
