import { listingQueue, emailQueue, aiModerationQueue } from './queue'

// ---------------------------------------------------------------------------
// Worker Process — Processes background jobs from queues
// ---------------------------------------------------------------------------

console.log('[Worker] Starting EK Marketplace worker...')

// ---------------------------------------------------------------------------
// Listing Queue Processor
// ---------------------------------------------------------------------------
listingQueue.process('process-listing', async (job) => {
  const { listingId } = job.data
  console.log(`[Worker] Processing listing: ${listingId}`)

  // TODO: Implement listing post-processing
  // - Generate SEO slug
  // - Resize/optimise images
  // - Send confirmation email to seller

  return { listingId, processed: true }
})

// ---------------------------------------------------------------------------
// Email Queue Processor
// ---------------------------------------------------------------------------
emailQueue.process('send-email', async (job) => {
  const { to, subject, template, data } = job.data
  console.log(`[Worker] Sending email to: ${to}, subject: ${subject}`)

  // TODO: Implement email sending via SMTP/SendGrid/Resend
  // import { sendEmail } from '@ek/config'

  return { to, sent: true }
})

// ---------------------------------------------------------------------------
// AI Moderation Queue Processor
// ---------------------------------------------------------------------------
aiModerationQueue.process('moderate-listing', async (job) => {
  const { listingId, content } = job.data
  console.log(`[Worker] AI moderating listing: ${listingId}`)

  // TODO: Call AI moderation service
  // import { moderateListing } from '@ek/ai'

  return { listingId, score: 0, flagged: false }
})

// ---------------------------------------------------------------------------
// Graceful Shutdown
// ---------------------------------------------------------------------------
const gracefulShutdown = async () => {
  console.log('[Worker] Shutting down gracefully...')
  await listingQueue.close()
  await emailQueue.close()
  await aiModerationQueue.close()
  process.exit(0)
}

process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)

console.log('[Worker] Ready and listening for jobs')
