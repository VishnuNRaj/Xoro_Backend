"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const stream_1 = require("stream");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const outputPath = path_1.default.join(__dirname, "Live/stream.flv");
console.log(outputPath);
if (!fs_1.default.existsSync(path_1.default.join(__dirname, 'Live'))) {
    fs_1.default.mkdirSync(path_1.default.join(__dirname, 'Live'));
}
const wss = new ws_1.Server({ port: 8080 });
console.log("WebSocket server started on port 8080");
wss.on('connection', (ws) => {
    console.log('Client connected');
    const ffmpegStream = new stream_1.PassThrough();
    const ffmpegProcess = (0, fluent_ffmpeg_1.default)(ffmpegStream)
        .inputFormat('flv')
        .videoCodec('copy')
        .audioCodec('copy')
        .on('start', (commandLine) => {
        console.log('Spawned FFmpeg with command: ' + commandLine);
    })
        .on('progress', (progress) => {
        console.log('Processing: ' + progress.frames + ' frames completed');
    })
        .on('end', () => {
        console.log('File has been converted successfully');
    })
        .on('error', (err) => {
        console.error('An error occurred: ' + err.message);
    })
        .save(outputPath);
    ws.on('message', (message) => {
        console.log(`Received message of length: ${typeof message}`);
        ffmpegStream.write(message);
    });
    ws.on('close', () => {
        ffmpegStream.end();
        console.log('Client disconnected');
    });
    ws.on('error', (err) => {
        console.error('WebSocket error:', err);
    });
});
