/**
 * EK Marketplace Worker – entry point
 *
 * Processes background jobs: AI tasks, photo processing, email, moderation.
 * TODO: integrate a job queue (BullMQ + Redis) in Phase 2.
 * TODO: add OpenAI listing analysis worker.
 * TODO: add photo resize/optimisation worker.
 */

const PORT = process.env.WORKER_PORT ?? 5000;

console.log(`[worker] starting on port ${PORT}`);
console.log('[worker] TODO: connect to Redis / BullMQ job queue');
console.log('[worker] TODO: register job processors');

// Placeholder keep-alive
setInterval(() => {
  // TODO: replace with real job queue polling / BullMQ workers
}, 30_000);
