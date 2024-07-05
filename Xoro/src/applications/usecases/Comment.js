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
exports.getComments = exports.addCommentReply = exports.AddComment = void 0;
const Repository = __importStar(require("../repository/User/UserCommentRepository"));
const DatabaseFunctions = __importStar(require("../functions/DatabaseFunctions"));
const AddComment = (_a) => __awaiter(void 0, [_a], void 0, function* ({ Comment, PostId, user }) {
    try {
        console.log(Comment);
        if (Comment.length === 0) {
            return {
                message: "Enter Something",
                status: 201,
            };
        }
        const filteredComment = Comment.filter((str, i, arr) => arr[i - 1] === "@" && DatabaseFunctions.checkObjectId(str));
        const tags = filteredComment.length > 0 ? yield DatabaseFunctions.findUsersObjectId(filteredComment) : [];
        console.log(tags, filteredComment);
        return yield Repository.addComment({ tags, Comment, PostId, user });
    }
    catch (e) {
        console.log(e);
        return {
            message: "Internal Server Erorr",
            status: 500
        };
    }
});
exports.AddComment = AddComment;
const addCommentReply = (_b) => __awaiter(void 0, [_b], void 0, function* ({ Comment, CommentId, UserId }) {
    try {
        if (Comment.length === 0) {
            return {
                message: "Enter Something",
                status: 201,
            };
        }
        if (!DatabaseFunctions.checkObjectId(CommentId)) {
            return {
                message: "Invalid Credentials",
                status: 201,
            };
        }
        const filteredComment = Comment.filter((str, i, arr) => arr[i - 1] === "@" && DatabaseFunctions.checkObjectId(str));
        const tags = filteredComment.length > 0 ? yield DatabaseFunctions.findUsersObjectId() : [];
        return yield Repository.addComment({ tags, Comment, CommentId, UserId });
    }
    catch (e) {
    }
});
exports.addCommentReply = addCommentReply;
const getComments = (PostId, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!PostId) {
            return {
                message: "Invalid Credentials",
                status: 201
            };
        }
        return yield Repository.getComments(PostId, user);
    }
    catch (error) {
        return {
            message: "Internal Server Error",
            status: 500
        };
    }
});
exports.getComments = getComments;
