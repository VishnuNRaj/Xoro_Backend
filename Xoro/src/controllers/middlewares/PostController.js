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
exports.ReportPost = exports.GetPosts = exports.RemoveReactions = exports.DislikePost = exports.LikePost = exports.DeletePost = exports.ShowPostImages = exports.PostImages = void 0;
const UseCases = __importStar(require("../../applications/usecases/Post"));
const PostImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = req.result;
        const Media = req.files;
        const { Caption, CommentsOn, Hashtags, Tags, Hidden } = req.body;
        const data = yield UseCases.AddPost({ Media, Caption, CommentsOn, Hashtags, Tags, Hidden, user: result === null || result === void 0 ? void 0 : result.user });
        console.log(data);
        return res.status(data.status).json(data);
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.PostImages = PostImages;
const ShowPostImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = req.result;
        console.log(result);
        if (result && result.user) {
            const data = yield UseCases.ShowPost({ user: result === null || result === void 0 ? void 0 : result.user });
            return res.status(data.status).json(data);
        }
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.ShowPostImages = ShowPostImages;
const DeletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = req.result;
        const { PostId } = req.params;
        const data = yield UseCases.DeletePost({ PostId, user: result === null || result === void 0 ? void 0 : result.user });
        return res.status(data.status).json(data);
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.DeletePost = DeletePost;
const LikePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = req.result;
        const { PostId } = req.params;
        const data = yield UseCases.LikePost({ PostId, UserId: (_a = result === null || result === void 0 ? void 0 : result.user) === null || _a === void 0 ? void 0 : _a._id });
        return res.status(data.status).json(data);
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.LikePost = LikePost;
const DislikePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const result = req.result;
        const { PostId } = req.params;
        const data = yield UseCases.DislikePost({ PostId, UserId: (_b = result === null || result === void 0 ? void 0 : result.user) === null || _b === void 0 ? void 0 : _b._id });
        return res.status(data.status).json(data);
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.DislikePost = DislikePost;
const RemoveReactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const result = req.result;
        const { PostId } = req.params;
        const data = yield UseCases.RemoveReactions({ PostId, UserId: (_c = result === null || result === void 0 ? void 0 : result.user) === null || _c === void 0 ? void 0 : _c._id });
        return res.status(data.status).json(data);
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.RemoveReactions = RemoveReactions;
const GetPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const result = req.result;
        const { skip } = req.params;
        const data = yield UseCases.GetPosts({ UserId: (_d = result === null || result === void 0 ? void 0 : result.user) === null || _d === void 0 ? void 0 : _d._id, skip: parseInt(skip) });
        return res.status(data.status).json(Object.assign(Object.assign({}, data), { user: result === null || result === void 0 ? void 0 : result.user }));
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.GetPosts = GetPosts;
const ReportPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const result = req.result;
        const { PostId } = req.params;
        const { Message, Content } = req.body;
        const data = yield UseCases.ReportPost({ Message, Content, PostId, UserId: (_e = result === null || result === void 0 ? void 0 : result.user) === null || _e === void 0 ? void 0 : _e._id });
    }
    catch (e) {
        return res.status(500).json({ Message: "Internal Server Error" });
    }
});
exports.ReportPost = ReportPost;
