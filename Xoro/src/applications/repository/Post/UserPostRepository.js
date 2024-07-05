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
exports.getPostsRepository = exports.RemoveReactions = exports.DislikePostRepository = exports.LikePostRepository = exports.deletePostRepository = exports.showPostImagesRepository = exports.addPostImagesRepository = void 0;
const DatabaseFunctions = __importStar(require("../../functions/DatabaseFunctions"));
const ResponseFunctions = __importStar(require("../../responses/PostResponse"));
const CommonFunctions = __importStar(require("../../functions/CommonFunctions"));
const ImagesPost_1 = __importDefault(require("../../../frameworks/database/models/ImagesPost"));
const Reactions_1 = __importDefault(require("./../../../frameworks/database/models/Reactions"));
const addPostImagesRepository = (_a) => __awaiter(void 0, [_a], void 0, function* ({ Caption, CommentsOn, Hashtags, Hidden, Images, Tags, user }) {
    try {
        let newPost = new ImagesPost_1.default({
            Caption: Caption,
            UserId: user._id,
            CommentsOn: CommentsOn,
            Hashtags: Hashtags,
            Hidden: Hidden,
            Images: Images ? Images : [],
            Postdate: new Date(),
            Tags: Tags,
            Comments: 0,
            Dislikes: 0,
            Likes: 0,
            ShowReactions: true,
            ShareLink: CommonFunctions.generateVerificationLink(),
        });
        const [reaction] = yield DatabaseFunctions.insertData(Reactions_1.default, { PostId: newPost._id });
        yield Promise.all([
            newPost.Reactions = reaction._id,
            yield DatabaseFunctions.saveData(newPost),
            user.Posts += 1,
            yield DatabaseFunctions.saveData(user),
        ]);
        return ResponseFunctions.addPostRes({
            message: 'Post Added Successfully',
            status: 200
        });
    }
    catch (e) {
        console.log(e);
        return ResponseFunctions.addPostRes({
            message: 'Internal Server Error',
            status: 500
        });
    }
});
exports.addPostImagesRepository = addPostImagesRepository;
const showPostImagesRepository = (_b) => __awaiter(void 0, [_b], void 0, function* ({ user }) {
    try {
        const posts = yield DatabaseFunctions.findData(ImagesPost_1.default, { UserId: user._id });
        const connections = yield DatabaseFunctions.getFollowers(user._id);
        return ResponseFunctions.showPostRes({
            message: 'Verified',
            post: posts,
            status: 200,
            user: user,
            connections
        });
    }
    catch (e) {
        return ResponseFunctions.showPostRes({
            message: 'Internal Server Error',
            post: null,
            status: 500
        });
    }
});
exports.showPostImagesRepository = showPostImagesRepository;
const deletePostRepository = (_c) => __awaiter(void 0, [_c], void 0, function* ({ PostId, user }) {
    try {
        const responses = yield DatabaseFunctions.checkObjectId(PostId);
        if (!responses) {
            return ResponseFunctions.deletePostRes({
                message: 'Invalid Credentials',
                status: 201
            });
        }
        yield DatabaseFunctions.deleteUsingId(ImagesPost_1.default, PostId);
        user.Posts = yield DatabaseFunctions.countDocuments(ImagesPost_1.default, user._id, 'UserId');
        console.log(user.Posts);
        yield DatabaseFunctions.saveData(user);
        return ResponseFunctions.deletePostRes({
            message: 'Deleted Successfully',
            status: 200
        });
    }
    catch (e) {
        return ResponseFunctions.deletePostRes({
            message: 'Internal Server Error',
            status: 500
        });
    }
});
exports.deletePostRepository = deletePostRepository;
const LikePostRepository = (_d) => __awaiter(void 0, [_d], void 0, function* ({ PostId, UserId }) {
    try {
        const responses = yield Promise.all([
            yield DatabaseFunctions.checkObjectId(PostId),
            yield DatabaseFunctions.checkObjectId(UserId),
        ]);
        console.log(responses);
        if (!responses[0] || !responses[1]) {
            return ResponseFunctions.deletePostRes({
                message: 'Invalid Credentials',
                status: 201
            });
        }
        const post = yield DatabaseFunctions.findUsingId(ImagesPost_1.default, PostId);
        // 👎
        const result = yield DatabaseFunctions.likeDislikePost(post.Reactions, UserId, 'Likes', 'Dislikes');
        post.Likes = result.Likes.length;
        post.Dislikes = result.Dislikes.length;
        yield DatabaseFunctions.saveData(post);
        return ResponseFunctions.deletePostRes({
            message: '👍',
            status: 200
        });
    }
    catch (e) {
        return ResponseFunctions.deletePostRes({
            message: 'Internal Server Error',
            status: 500
        });
    }
});
exports.LikePostRepository = LikePostRepository;
const DislikePostRepository = (_e) => __awaiter(void 0, [_e], void 0, function* ({ PostId, UserId }) {
    try {
        const responses = yield Promise.all([
            yield DatabaseFunctions.checkObjectId(PostId),
            yield DatabaseFunctions.checkObjectId(UserId),
        ]);
        if (!responses[0] || !responses[1]) {
            return ResponseFunctions.deletePostRes({
                message: 'Invalid Credentials',
                status: 201
            });
        }
        const post = yield DatabaseFunctions.findUsingId(ImagesPost_1.default, PostId);
        const result = yield DatabaseFunctions.likeDislikePost(post.Reactions, UserId, 'Dislikes', 'Likes');
        post.Likes = result.Likes.length;
        post.Dislikes = result.Dislikes.length;
        yield DatabaseFunctions.saveData(post);
        return ResponseFunctions.deletePostRes({
            message: '👎',
            status: 200
        });
    }
    catch (e) {
        console.log(e);
        return ResponseFunctions.deletePostRes({
            message: 'Internal Server Error',
            status: 500
        });
    }
});
exports.DislikePostRepository = DislikePostRepository;
const RemoveReactions = (_f) => __awaiter(void 0, [_f], void 0, function* ({ PostId, UserId }) {
    try {
        const responses = yield Promise.all([
            yield DatabaseFunctions.checkObjectId(PostId),
            yield DatabaseFunctions.checkObjectId(UserId),
        ]);
        if (!responses[0] || !responses[1]) {
            return ResponseFunctions.deletePostRes({
                message: 'Invalid Credentials',
                status: 201
            });
        }
        const post = yield DatabaseFunctions.findUsingId(ImagesPost_1.default, PostId);
        const reaction = yield DatabaseFunctions.pullReactions(Reactions_1.default, post.Reactions, UserId);
        post.Likes = reaction.Likes.length;
        post.Dislikes = reaction.Dislikes.length;
        yield DatabaseFunctions.saveData(post);
        return ResponseFunctions.deletePostRes({
            message: 'Removed',
            status: 200
        });
    }
    catch (e) {
        return ResponseFunctions.deletePostRes({
            message: 'Internal Server Error',
            status: 500
        });
    }
});
exports.RemoveReactions = RemoveReactions;
const getPostsRepository = (_g) => __awaiter(void 0, [_g], void 0, function* ({ UserId, skip }) {
    try {
        const responses = yield DatabaseFunctions.checkObjectId(UserId);
        if (!responses) {
            return ResponseFunctions.getPostRes({
                message: 'Invalid Credentials',
                status: 201,
                post: []
            });
        }
        const connections = yield DatabaseFunctions.getFollowers(UserId);
        const Idx = Array.from(new Set([...connections.Followers, ...connections.Following, UserId]));
        const post = yield DatabaseFunctions.getPosts(Idx, skip);
        return ResponseFunctions.getPostRes({
            connections: connections,
            post: post || [],
            message: 'Found',
            status: 200
        });
    }
    catch (e) {
        console.log(e);
        return ResponseFunctions.getPostRes({
            message: 'Internal Server Error',
            status: 500
        });
    }
});
exports.getPostsRepository = getPostsRepository;
