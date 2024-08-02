import Redis from 'ioredis';
import { activeStreams } from '../socket';

const redisSubscriber = new Redis({
    host: 'localhost',
    port: 6379
});

redisSubscriber.on('error', (err) => {
    console.error('Redis Subscriber Error:', err.message);
});

redisSubscriber.on('connect', () => {
    console.log('Redis Subscriber connected');
});

redisSubscriber.on('message', (channel, message) => {
    console.log(`Received message for channel ${channel}`);
    const process = activeStreams[channel];
    if (process) {
        console.log(`Streaming data to FFmpeg for channel ${channel}`);
        const buffer = Buffer.from(message, 'base64');
        process.stdin.write(buffer);
    } else {
        console.error(`No active FFmpeg process found for channel ${channel}`);
    }
});

export { redisSubscriber };
