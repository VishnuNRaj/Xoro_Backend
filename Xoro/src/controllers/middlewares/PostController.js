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
exports.ShowPostImages = exports.PostImages = void 0;
const UseCases = __importStar(require("../../applications/usecases/Post"));
const PostImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = req.result;
        const { Images, Caption, CommentsOn, Hashtags, Tags, Hidden } = req.body;
        const data = yield UseCases.AddPost({ Images, Caption, CommentsOn, Hashtags, Tags, Hidden, user: result === null || result === void 0 ? void 0 : result.user });
        return res.status(data.status).json(data);
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.PostImages = PostImages;
const ShowPostImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = req.result;
        if (result && ((_a = result.user) === null || _a === void 0 ? void 0 : _a._id)) {
            const data = yield UseCases.ShowPost({ user: result === null || result === void 0 ? void 0 : result.user });
            console.log(data);
            return res.status(data.status).json(data);
        }
    }
    catch (e) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.ShowPostImages = ShowPostImages;
