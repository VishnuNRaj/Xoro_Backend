"use strict";
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
const Middlewares = (UseCases) => {
    const getChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = req === null || req === void 0 ? void 0 : req.result;
            if (result && result.user) {
                const data = yield UseCases.getChats({ user: result.user });
                console.log(data);
                return res.status(data.status).json(data);
            }
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    });
    const SendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = req === null || req === void 0 ? void 0 : req.result;
            const { RoomId } = req.params;
            const files = req.files;
            const { Message } = req.body;
            if (files && (result === null || result === void 0 ? void 0 : result.user) && Message && RoomId) {
                const data = yield UseCases.SendMessage({
                    Files: files, RoomId, user: result === null || result === void 0 ? void 0 : result.user, Message: Message,
                    Data: []
                });
                return res.status(data.status).json(data);
            }
        }
        catch (e) {
            return res.status(500).json({ message: 'Internal Server Error ' });
        }
    });
    const StartChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = req === null || req === void 0 ? void 0 : req.result;
            const { UserId, Profile, GroupName } = req.body;
            const data = yield UseCases.StartChat({
                user: result === null || result === void 0 ? void 0 : result.user,
                UserId: UserId,
                GroupName: GroupName,
                Profile: Profile
            });
            return res.status(data.status).json(data);
        }
        catch (e) {
            return res.status(500).json({ message: 'Internal Server Error ' });
        }
    });
    const getChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = req === null || req === void 0 ? void 0 : req.result;
            const { RoomId } = req.params;
            console.log(RoomId);
            if (result === null || result === void 0 ? void 0 : result.user) {
                const data = yield UseCases.getChat({ RoomId, user: result.user });
                res.status(data.status).json(data);
            }
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Internal Server Error ' });
        }
    });
    return {
        getChats,
        getChat,
        SendMessage,
        StartChat
    };
};
exports.default = Middlewares;
