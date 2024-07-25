"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const child_process_1 = require("child_process");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const maxConcurrentProcesses = 5;
let runningProcesses = 0;
const processQueue = [];
const startFFmpegProcess = (videoPath, streamingUrl, res) => {
    const ffmpegCommand = 'ffmpeg';
    const args = [
        '-re',
        '-analyzeduration', '100M',
        '-probesize', '100M',
        '-i', videoPath,
        '-c:v', 'libx264',
        '-preset', 'veryfast',
        '-maxrate', '3000k',
        '-bufsize', '6000k',
        '-vf', 'scale=-2:720',
        '-c:a', 'aac',
        '-b:a', '128k',
        '-f', 'flv',
        streamingUrl
    ];
    const ffmpegProcess = (0, child_process_1.spawn)(ffmpegCommand, args);
    ffmpegProcess.stdout.on('data', (data) => {
        console.log(`FFmpeg stdout: ${data}`);
    });
    ffmpegProcess.stderr.on('data', (data) => {
        console.error(`FFmpeg stderr: ${data}`);
    });
    ffmpegProcess.on('close', (code) => {
        console.log(`FFmpeg process exited with code ${code}`);
        runningProcesses--;
        if (processQueue.length > 0) {
            const nextTask = processQueue.shift();
            if (nextTask)
                nextTask();
        }
    });
    runningProcesses++;
    res.json({ streamingUrl });
};
app.get('/abc', (_req, res) => {
    const videoFile = 'file_1720980310767.mp4';
    const streamingUrl = `rtmp://localhost/live/${videoFile}`;
    const videoPath = path_1.default.join(__dirname, 'Public', videoFile);
    if (runningProcesses < maxConcurrentProcesses) {
        startFFmpegProcess(videoPath, streamingUrl, res);
    }
    else {
        processQueue.push(() => startFFmpegProcess(videoPath, streamingUrl, res));
    }
});
app.listen(6707, () => {
    console.log('Server is running on port 6707');
});
