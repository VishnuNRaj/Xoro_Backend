import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import { spawn, ChildProcess } from 'child_process';
import Redis from 'ioredis';
import ConfigFile from '../config';

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server, {
    cors: {
        origin: "*"
    }
});
const redisPublisher = new Redis({
    host: 'localhost',
    port: 6379
});

const redisSubscriber = new Redis({
    host: 'localhost',
    port: 6379
});
redisSubscriber.on('error', (err) => {
    console.error('Redis Subscriber Error:', err.message);
});

redisPublisher.on('error', (err) => {
    console.error('Redis Publisher Error:', err.message);
});

redisSubscriber.on('connect', () => {
    console.log('Redis Subscriber connected');
});

redisPublisher.on('connect', () => {
    console.log('Redis Publisher connected');
});

const activeStreams: { [key: string]: ChildProcess | undefined | any } = {}; // Track FFmpeg processes

redisSubscriber.on('message', (channel, message) => {
    console.log(`Received message for channel ${channel}`);
    const process = activeStreams[channel];
    if (process) {
        console.log(`Streaming data to FFmpeg for channel ${channel}`);
        // Convert `message` from base64 encoded string to Buffer
        const buffer = Buffer.from(message, 'base64');
        process.stdin.write(buffer);
    } else {
        console.error(`No active FFmpeg process found for channel ${channel}`);
    }
});

io.on('connection', (socket) => {
    let streamKey: string | null = null;

    socket.on('start-stream', ({ streamKey: newStreamKey }: { streamKey: string }) => {
        console.log(`Starting stream with key: ${newStreamKey}`);
        streamKey = newStreamKey;

        redisSubscriber.subscribe(streamKey, (err, count) => {
            if (err) {
                console.error('Failed to subscribe:', err.message);
            } else {
                console.log(`Subscribed to ${count} channel(s).`);
            }
        });

        if (!activeStreams[streamKey]) {
            console.log(`Initializing FFmpeg process for ${streamKey}`);
            const ffmpegProcess = spawn('ffmpeg', [
                '-i', 'pipe:0',
                '-c:v', 'libx264',
                '-c:a', 'aac',
                '-f', 'flv',
                `${ConfigFile.RTMP_URL}/live/${streamKey}`
            ]);

            ffmpegProcess.on('error', (err) => {
                console.error('FFmpeg Error:', err.message);
            });

            ffmpegProcess.on('close', (code) => {
                console.log(`FFmpeg process exited with code ${code}`);
            });

            ffmpegProcess.on('exit', (code) => {
                console.log(`FFmpeg process exited with code ${code}`);
            });

            activeStreams[streamKey] = ffmpegProcess;
        } else {
            console.log(`FFmpeg process already active for ${streamKey}`);
        }
    });

    socket.on('stream-data', ({ streamKey, data }: { streamKey: string; data: any }) => {
        console.log(`Publishing data to channel ${streamKey}`);
        // Ensure data is in correct format
        const base64Data = Buffer.from(data).toString('base64');
        redisPublisher.publish(streamKey, base64Data, (err, result) => {
            if (err) {
                console.error('Failed to publish data:', err.message);
            } else {
                console.log(`Published data to channel ${streamKey} and result is ${result}`);
            }
        });
    });

    socket.on('end-stream', ({ streamKey }: { streamKey: string }) => {
        console.log(`Ending stream with key: ${streamKey}`);
        redisSubscriber.unsubscribe(streamKey, (err, count) => {
            if (err) {
                console.error('Failed to unsubscribe:', err.message);
            } else {
                console.log(`Unsubscribed from ${count} channel(s).`);
            }
        });

        if (streamKey && activeStreams[streamKey]) {
            console.log(`Stopping FFmpeg process for ${streamKey}`);
            activeStreams[streamKey]?.stdin.end(); // Properly end stdin to close the process
            delete activeStreams[streamKey];
        }
    });

    socket.on('disconnect', () => {
        if (streamKey) {
            console.log(`Client disconnected, ending stream with key: ${streamKey}`);
            redisSubscriber.unsubscribe(streamKey, (err, count) => {
                if (err) {
                    console.error('Failed to unsubscribe:', err.message);
                } else {
                    console.log(`Unsubscribed from ${count} channel(s).`);
                }
            });

            if (streamKey && activeStreams[streamKey]) {
                console.log(`Stopping FFmpeg process for ${streamKey}`);
                activeStreams[streamKey]?.stdin.end(); // Properly end stdin to close the process
                delete activeStreams[streamKey];
            }
        }
    });
});

server.listen(3000, () => console.log('Server running on port 3000'));
