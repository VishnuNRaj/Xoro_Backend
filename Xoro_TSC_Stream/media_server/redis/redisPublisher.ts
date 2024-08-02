import Redis from 'ioredis';

const redisPublisher = new Redis({
    host: 'localhost',
    port: 6379
});

redisPublisher.on('error', (err) => {
    console.error('Redis Publisher Error:', err.message);
});

redisPublisher.on('connect', () => {
    console.log('Redis Publisher connected');
});

export { redisPublisher };
