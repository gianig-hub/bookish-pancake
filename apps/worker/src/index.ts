import { Worker } from 'bullmq';
import IORedis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const connection = new IORedis(redisUrl, { maxRetriesPerRequest: null });

console.log('Worker started. Waiting for jobs...');

// TODO: Register processors here as queues are added
// Example:
// const emailWorker = new Worker('email', emailProcessor, { connection });

connection.on('connect', () => console.log('Connected to Redis'));
connection.on('error', (err) => console.error('Redis error:', err));
