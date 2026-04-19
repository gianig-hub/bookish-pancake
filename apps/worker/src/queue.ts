import Bull from 'bull'

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379'

const defaultJobOptions: Bull.JobOptions = {
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: 2000,
  },
  removeOnComplete: 100,
  removeOnFail: 50,
}

// ---------------------------------------------------------------------------
// Queue Definitions
// ---------------------------------------------------------------------------

export const listingQueue = new Bull('listings', REDIS_URL, {
  defaultJobOptions,
})

export const emailQueue = new Bull('emails', REDIS_URL, {
  defaultJobOptions,
})

export const aiModerationQueue = new Bull('ai-moderation', REDIS_URL, {
  defaultJobOptions: {
    ...defaultJobOptions,
    attempts: 2,
  },
})

// ---------------------------------------------------------------------------
// Queue Event Logging
// ---------------------------------------------------------------------------

const queues = [
  { queue: listingQueue, name: 'listings' },
  { queue: emailQueue, name: 'emails' },
  { queue: aiModerationQueue, name: 'ai-moderation' },
]

queues.forEach(({ queue, name }) => {
  queue.on('completed', (job) => {
    console.log(`[Queue:${name}] Job ${job.id} completed`)
  })

  queue.on('failed', (job, err) => {
    console.error(`[Queue:${name}] Job ${job.id} failed:`, err.message)
  })

  queue.on('error', (err) => {
    console.error(`[Queue:${name}] Queue error:`, err.message)
  })
})

// ---------------------------------------------------------------------------
// Helper: Add jobs to queues
// ---------------------------------------------------------------------------

export const addListingJob = (type: string, data: Record<string, unknown>) =>
  listingQueue.add(type, data)

export const addEmailJob = (data: {
  to: string
  subject: string
  template: string
  data: Record<string, unknown>
}) => emailQueue.add('send-email', data)

export const addModerationJob = (data: { listingId: string; content: string }) =>
  aiModerationQueue.add('moderate-listing', data)
