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
exports.getChat = exports.StartChat = exports.SendMessage = exports.getChats = void 0;
const DatabaseFunctions = __importStar(require("../../functions/DatabaseFunctions"));
const ResponseFunctions = __importStar(require("../../responses/ChatResponse"));
const Messages_1 = __importDefault(require("../../../frameworks/database/models/Messages"));
const Chat_1 = __importDefault(require("../../../frameworks/database/models/Chat"));
const getChats = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield DatabaseFunctions.getChats(user._id);
        const users = yield DatabaseFunctions.getFollowers(user._id);
        return yield ResponseFunctions.getChats({
            user: user,
            message: 'Welcome',
            status: 200,
            allChats: data,
            users: users
        });
    }
    catch (e) {
        return yield ResponseFunctions.getChats({
            user: user,
            message: 'Internal Server Error',
            status: 500,
            allChats: [],
        });
    }
});
exports.getChats = getChats;
const SendMessage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield DatabaseFunctions.insertData(Messages_1.default, {
            Message: data.Message,
            Files: data.Data,
            Time: new Date(),
            Seen: [data.user._id],
            RoomId: data.RoomId,
            SenderId: data.user._id,
        });
        return yield ResponseFunctions.SendMessage({
            message: 'Send',
            status: 200,
            chat: result
        });
    }
    catch (e) {
        return yield ResponseFunctions.SendMessage({
            message: 'Internal Server Error',
            status: 500,
        });
    }
});
exports.SendMessage = SendMessage;
const StartChat = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let err = null;
        console.log(data);
        data.Users = data.Users.filter((id) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield DatabaseFunctions.checkObjectId(id.UserId);
            if (!response)
                err = "Invalid Credentials";
            return response;
        }));
        const users = yield DatabaseFunctions.findUsers(data.Users);
        const oldData = data.Users.length > 2 ? null : yield DatabaseFunctions.checkChat(data.Users.map((val) => val.UserId));
        if (oldData) {
            return ResponseFunctions.StartChat({
                message: "Start Chatting",
                status: 200,
                newChat: oldData,
                users: users
            });
        }
        let [newChat] = yield DatabaseFunctions.insertData(Chat_1.default, data);
        if (data.Users.length !== users.length || err) {
            return ResponseFunctions.StartChat({
                message: err || "",
                status: 201,
            });
        }
        return ResponseFunctions.StartChat({
            message: "Start Chatting",
            status: 200,
            newChat: newChat,
            users: users
        });
    }
    catch (e) {
        console.log(e);
        return ResponseFunctions.StartChat({
            message: "Internal Server Error",
            status: 500,
        });
    }
});
exports.StartChat = StartChat;
const getChat = (RoomId, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let chat = yield DatabaseFunctions.getChat(RoomId);
        console.log(chat);
        const [date] = (_a = chat === null || chat === void 0 ? void 0 : chat.LastClear) === null || _a === void 0 ? void 0 : _a.filter((Users) => Users.UserId === user._id);
        (_b = chat === null || chat === void 0 ? void 0 : chat.messages) === null || _b === void 0 ? void 0 : _b.filter((message) => message.Time > (date === null || date === void 0 ? void 0 : date.Time));
        return ResponseFunctions.getChat({
            chat: chat,
            message: 'Found',
            status: 200,
        });
    }
    catch (e) {
        console.log(e);
        return ResponseFunctions.getChat({
            message: 'Internal Server Error',
            status: 500,
        });
    }
});
exports.getChat = getChat;
