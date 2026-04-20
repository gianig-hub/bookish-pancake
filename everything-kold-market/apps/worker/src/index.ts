import 'dotenv/config';

// TODO: Import Bull queues and processors as they are implemented
// import { listingQueue } from './queues/listing.queue';
// import { emailQueue } from './queues/email.queue';
// import { aiQueue } from './queues/ai.queue';

const REDIS_URL = process.env.REDIS_URL ?? 'redis://localhost:6379';

async function start() {
  console.log('[Worker] Starting EK Marketplace worker');
  console.log(`[Worker] Redis: ${REDIS_URL}`);

  // TODO: Register job processors here
  // listingQueue.process(processListing);
  // emailQueue.process(processEmail);
  // aiQueue.process(processAiJob);

  console.log('[Worker] Worker ready and listening for jobs');

  // Graceful shutdown
  process.on('SIGTERM', async () => {
    console.log('[Worker] SIGTERM received, shutting down gracefully...');
    // TODO: Close queues cleanly
    process.exit(0);
  });
}

start().catch((err) => {
  console.error('[Worker] Fatal error:', err);
  process.exit(1);
});
