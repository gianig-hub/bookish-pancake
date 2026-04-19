// KoldMarket Worker — entry point
//
// This is the background job processor.
// It connects to Redis (BullMQ) and processes jobs from the API.
//
// TODO: Register job queues and workers here as they are built.
// See README.md for how to add a new job type.

const REDIS_URL = process.env.REDIS_URL ?? 'redis://localhost:6379'

console.log('KoldMarket Worker starting...')
console.log(`Redis: ${REDIS_URL}`)

// TODO: Import and register job workers
// import { registerEmailWorker } from './jobs/send-email.js'
// import { registerAIModerationWorker } from './jobs/ai-moderation.js'
//
// registerEmailWorker(REDIS_URL)
// registerAIModerationWorker(REDIS_URL)

console.log('Worker ready. Waiting for jobs...')

// Keep the process alive
process.on('SIGTERM', () => {
  console.log('Worker shutting down...')
  process.exit(0)
})
