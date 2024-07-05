import WebSocket, { Server as WebSocketServer } from 'ws';
import ffmpeg from 'fluent-ffmpeg';
import { PassThrough } from 'stream';
import path from 'path';
import fs from 'fs';

const outputPath = path.join(__dirname, "Live/stream.flv");
console.log(outputPath);

if (!fs.existsSync(path.join(__dirname, 'Live'))) {
    fs.mkdirSync(path.join(__dirname, 'Live'));
}

const wss = new WebSocketServer({ port: 8080 });
console.log("WebSocket server started on port 8080");

wss.on('connection', (ws: WebSocket) => {
    console.log('Client connected');

    const ffmpegStream = new PassThrough();

    const ffmpegProcess = ffmpeg(ffmpegStream)
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

    ws.on('message', (message: WebSocket.RawData) => {
        console.log(`Received message of length: ${typeof message}`);
        ffmpegStream.write(message);
    });

    ws.on('close', () => {
        ffmpegStream.end();
        console.log('Client disconnected');
    });

    ws.on('error', (err: Error) => {
        console.error('WebSocket error:', err);
    });
});
