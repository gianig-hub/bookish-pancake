import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'

const app = express()
const PORT = process.env.PORT || 4000

// ---------------------------------------------------------------------------
// Security & Middleware
// ---------------------------------------------------------------------------
app.use(helmet())
app.use(compression())
app.use(morgan('dev'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

app.use(
  cors({
    origin: process.env.APP_URL || 'http://localhost:3000',
    credentials: true,
  })
)

const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60_000,
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  standardHeaders: true,
  legacyHeaders: false,
})
app.use(limiter)

// ---------------------------------------------------------------------------
// Health Check
// ---------------------------------------------------------------------------
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ---------------------------------------------------------------------------
// API Routes (TODO: register route modules here)
// ---------------------------------------------------------------------------
app.get('/api/v1', (_req, res) => {
  res.json({ message: 'EK Marketplace API', version: '1.0.0' })
})

// TODO: Register routes
// app.use('/api/v1/listings', listingsRouter)
// app.use('/api/v1/users', usersRouter)
// app.use('/api/v1/categories', categoriesRouter)
// app.use('/api/v1/messages', messagesRouter)

// ---------------------------------------------------------------------------
// 404 Handler
// ---------------------------------------------------------------------------
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// ---------------------------------------------------------------------------
// Error Handler
// ---------------------------------------------------------------------------
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

// ---------------------------------------------------------------------------
// Start Server
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`[API] Server running on http://localhost:${PORT}`)
})

export default app
