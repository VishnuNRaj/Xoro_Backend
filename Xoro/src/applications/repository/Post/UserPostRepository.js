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
exports.showPostImagesRepository = exports.addPostImagesRepository = void 0;
const DatabaseFunctions = __importStar(require("../../functions/DatabaseFunctions"));
const ResponseFunctions = __importStar(require("../../responses/Response/PostResponse"));
const CommonFunctions = __importStar(require("../../functions/CommonFunctions"));
const ImagesPost_1 = __importDefault(require("../../../frameworks/database/models/ImagesPost"));
const User_1 = __importDefault(require("./../../../frameworks/database/models/User"));
const addPostImagesRepository = (_a) => __awaiter(void 0, [_a], void 0, function* ({ Caption, CommentsOn, Hashtags, Hidden, Images, Tags, user }) {
    try {
        let post = null;
        const userData = yield DatabaseFunctions.findUsingId(User_1.default, user._id);
        if (userData.Images)
            post = yield DatabaseFunctions.findUsingId(ImagesPost_1.default, userData.Images);
        else {
            post = new ImagesPost_1.default({
                UserId: user._id,
                Posts: []
            });
            yield DatabaseFunctions.updateById(User_1.default, user._id, { Images: post._id });
        }
        const newPost = {
            Caption: Caption,
            CommentsOn: CommentsOn,
            Hashtags: Hashtags,
            Hidden: Hidden,
            Images: Images,
            Postdate: new Date(),
            Tags: Tags,
            Comments: 0,
            Dislikes: 0,
            Likes: 0,
            ShowReactions: true,
            ShareLink: CommonFunctions.generateVerificationLink(),
        };
        if (post) {
            post.Posts.push(newPost);
            yield post.save();
            user.Posts += 1;
            yield user.save();
        }
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
        let Images = null;
        if (!user.Images) {
            Images = new ImagesPost_1.default({
                UserId: user._id,
                Posts: []
            });
            yield Images.save();
            user.Images = Images._id;
            yield user.save();
        }
        else
            Images = yield DatabaseFunctions.findUsingId(ImagesPost_1.default, user.Images);
        return ResponseFunctions.showPostRes({
            message: 'Verified',
            post: Images === null || Images === void 0 ? void 0 : Images.Posts,
            status: 200,
            user: user
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
