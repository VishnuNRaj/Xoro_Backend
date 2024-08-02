import socketio from 'socket.io';
import { initFFmpegProcess } from './system/ffmpeg';
import { redisPublisher } from './redis/redisPublisher';
import { redisSubscriber } from './redis/redisSubscriber';

const io = new socketio.Server({
    cors: {
        origin: "*"
    }
});

export const activeStreams: { [key: string]: any } = {};

io.on('connection', (socket) => {
    let streamKey: string | null = null;

    socket.on('start-stream', async ({ streamKey: newStreamKey }: { streamKey: string }) => {
        try {
            console.log(`Starting stream with key: ${newStreamKey}`);
            streamKey = newStreamKey;

            await redisSubscriber.subscribe(streamKey, (err, count) => {
                if (err) {
                    console.error('Failed to subscribe:', err.message);
                    return;
                }
                console.log(`Subscribed to ${count} channel(s).`);
            });

            if (!activeStreams[streamKey]) {
                console.log(`Initializing FFmpeg process for ${streamKey}`);
                const ffmpegProcess = initFFmpegProcess(streamKey);
                activeStreams[streamKey] = ffmpegProcess;
            } else {
                console.log(`FFmpeg process already active for ${streamKey}`);
            }
        } catch (error: any) {
            console.error(`Error in start-stream: ${error.message}`);
        }
    });

    socket.on('stream-data', async ({ streamKey, data }: { streamKey: string; data: any }) => {
        try {
            console.log(`Publishing data to channel ${streamKey}`);
            const base64Data = Buffer.from(data).toString('base64');
            await redisPublisher.publish(streamKey, base64Data, (err, result) => {
                if (err) {
                    console.error('Failed to publish data:', err.message);
                    return;
                }
                console.log(`Published data to channel ${streamKey} and result is ${result}`);
            });
        } catch (error: any) {
            console.error(`Error in stream-data: ${error.message}`);
        }
    });

    socket.on('end-stream', async ({ streamKey }: { streamKey: string }) => {
        try {
            console.log(`Ending stream with key: ${streamKey}`);
            await redisSubscriber.unsubscribe(streamKey, (err, count) => {
                if (err) {
                    console.error('Failed to unsubscribe:', err.message);
                    return;
                }
                console.log(`Unsubscribed from ${count} channel(s).`);
            });

            if (streamKey && activeStreams[streamKey]) {
                console.log(`Stopping FFmpeg process for ${streamKey}`);
                activeStreams[streamKey]?.stdin.end();
                delete activeStreams[streamKey];
            }
        } catch (error: any) {
            console.error(`Error in end-stream: ${error.message}`);
        }
    });

    socket.on('disconnect', async () => {
        try {
            if (streamKey) {
                console.log(`Client disconnected, ending stream with key: ${streamKey}`);
                await redisSubscriber.unsubscribe(streamKey, (err, count) => {
                    if (err) {
                        console.error('Failed to unsubscribe:', err.message);
                        return;
                    }
                    console.log(`Unsubscribed from ${count} channel(s).`);
                });

                if (streamKey && activeStreams[streamKey]) {
                    console.log(`Stopping FFmpeg process for ${streamKey}`);
                    activeStreams[streamKey]?.stdin.end();
                    delete activeStreams[streamKey];
                }
            }
        } catch (error: any) {
            console.error(`Error in disconnect: ${error.message}`);
        }
    });
});

export default io;
