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
exports.GetPosts = exports.RemoveReactions = exports.DislikePost = exports.LikePost = exports.DeletePost = exports.ShowPost = exports.AddPost = void 0;
const Repository = __importStar(require("../repository/Post/UserPostRepository"));
const firebase_1 = require("../../config/firebase");
const AddPost = (_a) => __awaiter(void 0, [_a], void 0, function* ({ Caption, CommentsOn, Hashtags, Hidden, Media, Tags, user }) {
    try {
        if (!Media || Media.length === 0) {
            return {
                message: 'No Images Provided',
                status: 201
            };
        }
        const result = yield Promise.all(Media.map((media) => __awaiter(void 0, void 0, void 0, function* () {
            const link = yield (0, firebase_1.uploadFileToFirebase)(media, `posts/${user.id}/${Date.now()}`);
            return {
                postType: media.mimetype.split('/')[0],
                link: link
            };
        })));
        return yield Repository.addPostImagesRepository({ Caption, CommentsOn, Hashtags, Hidden, Images: result, Tags, user });
    }
    catch (e) {
        return {
            message: 'Internal Server Error',
            status: 500
        };
    }
});
exports.AddPost = AddPost;
const ShowPost = (_b) => __awaiter(void 0, [_b], void 0, function* ({ user }) {
    try {
        return yield Repository.showPostImagesRepository({ user });
    }
    catch (e) {
        return;
    }
});
exports.ShowPost = ShowPost;
const DeletePost = (_c) => __awaiter(void 0, [_c], void 0, function* ({ PostId, user }) {
    try {
        if (!PostId || typeof PostId !== 'string' || PostId.length === 0) {
            return {
                message: 'Invalid Credentials',
                status: 201
            };
        }
        return yield Repository.deletePostRepository({ PostId, user });
    }
    catch (e) {
        return {
            message: 'Internal Server Error',
            status: 500
        };
    }
});
exports.DeletePost = DeletePost;
const LikePost = (_d) => __awaiter(void 0, [_d], void 0, function* ({ PostId, UserId }) {
    try {
        if (typeof PostId !== 'string' || PostId.length === 0) {
            return {
                message: 'Invalid Credentials',
                status: 201
            };
        }
        return yield Repository.LikePostRepository({ PostId, UserId });
    }
    catch (e) {
        return {
            message: 'Internal Server Error',
            status: 500
        };
    }
});
exports.LikePost = LikePost;
const DislikePost = (_e) => __awaiter(void 0, [_e], void 0, function* ({ PostId, UserId }) {
    try {
        if (typeof PostId !== 'string' || PostId.length === 0) {
            return {
                message: 'Invalid Credentials',
                status: 201
            };
        }
        return yield Repository.DislikePostRepository({ PostId, UserId });
    }
    catch (e) {
        return {
            message: 'Internal Server Error',
            status: 500
        };
    }
});
exports.DislikePost = DislikePost;
const RemoveReactions = (_f) => __awaiter(void 0, [_f], void 0, function* ({ PostId, UserId }) {
    try {
        if (typeof PostId !== 'string' || PostId.length === 0) {
            return {
                message: 'Invalid Credentials',
                status: 201
            };
        }
        return yield Repository.RemoveReactions({ PostId, UserId });
    }
    catch (e) {
        return {
            message: 'Internal Server Error',
            status: 500
        };
    }
});
exports.RemoveReactions = RemoveReactions;
const GetPosts = (_g) => __awaiter(void 0, [_g], void 0, function* ({ UserId, skip }) {
    try {
        if (isNaN(skip)) {
            return {
                message: "Invalid Properties",
                status: 201,
                post: [],
            };
        }
        return yield Repository.getPostsRepository({ UserId, skip });
    }
    catch (e) {
        console.log(e);
        return {
            message: "Internal Server Error",
            status: 500,
        };
    }
});
exports.GetPosts = GetPosts;
