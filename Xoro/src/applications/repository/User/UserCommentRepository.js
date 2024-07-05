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
exports.getComments = exports.addCommentReply = exports.addComment = void 0;
const DatabaseFunctions = __importStar(require("../../functions/DatabaseFunctions"));
const ResponseFunctions = __importStar(require("../../responses/CommentResponse"));
const Comments_1 = __importStar(require("../../../frameworks/database/models/Comments"));
const addComment = (_a) => __awaiter(void 0, [_a], void 0, function* ({ Comment, PostId, user, tags }) {
    try {
        const [comment] = yield DatabaseFunctions.insertData(Comments_1.default, { Comment, PostId, UserId: user._id, Tags: tags });
        console.log(comment);
        // UserFunctions.createNotification
        return ResponseFunctions.addCommentRes({
            Comment: comment,
            message: "Commented",
            status: 200
        });
    }
    catch (e) {
        console.log(e);
        return ResponseFunctions.addCommentRes({
            message: "Internal Server Error",
            status: 500,
        });
    }
});
exports.addComment = addComment;
const addCommentReply = (_b) => __awaiter(void 0, [_b], void 0, function* ({ Comment, CommentId, UserId, tags }) {
    try {
        const [comment] = yield DatabaseFunctions.insertData(Comments_1.CommentReplies, { Comment, CommentId, UserId, Tags: tags });
        return ResponseFunctions.addCommentReplyRes({
            Comment: comment,
            message: "Reply Sent",
            status: 200
        });
    }
    catch (e) {
        return ResponseFunctions.addCommentRes({
            message: "Internal Server Error",
            status: 500,
        });
    }
});
exports.addCommentReply = addCommentReply;
const getComments = (PostId, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allComments = yield DatabaseFunctions.getComments(PostId);
        const newData = allComments.filter((comment) => comment.UserId === user._id);
        const otherData = allComments.filter((comment) => comment.UserId !== user._id);
        return ResponseFunctions.getCommentsRes({
            comments: [...newData, ...otherData],
            message: "Found",
            status: 200
        });
    }
    catch (e) {
        return ResponseFunctions.getCommentsRes({
            message: "Internal Server Error",
            status: 500,
        });
    }
});
exports.getComments = getComments;
