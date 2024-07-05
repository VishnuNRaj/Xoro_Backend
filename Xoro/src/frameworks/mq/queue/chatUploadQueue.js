"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatDeleteQueue = exports.chatUploadQueue = void 0;
const bullmq_1 = require("bullmq");
const Redis_1 = __importDefault(require("../../database/Redis"));
exports.chatUploadQueue = new bullmq_1.Queue('chatupload', {
    connection: Redis_1.default,
});
exports.chatDeleteQueue = new bullmq_1.Queue("chatdelete", {
    connection: Redis_1.default
});
exports.chatUploadQueue.on('waiting', () => {
    console.log('chatUploadQueue is ready and connected to Redis');
});
