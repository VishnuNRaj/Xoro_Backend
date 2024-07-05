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
exports.getChat = exports.StartChat = exports.SendMessage = exports.getChats = void 0;
const getChats = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return data;
});
exports.getChats = getChats;
const SendMessage = (data) => {
    return data;
};
exports.SendMessage = SendMessage;
const StartChat = (data) => {
    return data;
};
exports.StartChat = StartChat;
const getChat = (data) => {
    return data;
};
exports.getChat = getChat;
