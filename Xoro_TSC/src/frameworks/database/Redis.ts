import IORedis from 'ioredis';

const redis = new IORedis({
    host: '127.0.0.1',
    port: 6379,
    maxRetriesPerRequest:null,
});
redis.on('connect', () => console.log('Redis Connected on Worker'));

export default redis