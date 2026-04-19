import express from 'express'
import cors from 'cors'
import { healthRouter } from './routes/health.js'

const app = express()
const PORT = process.env.PORT ?? 4000

app.use(cors())
app.use(express.json())

// Routes
app.use('/health', healthRouter)

// TODO: Add routes as they are built
// app.use('/api/auth', authRouter)
// app.use('/api/listings', listingsRouter)
// app.use('/api/categories', categoriesRouter)
// app.use('/api/businesses', businessesRouter)
// app.use('/api/uploads', uploadsRouter)
// app.use('/api/ai', aiRouter)

app.listen(PORT, () => {
  console.log(`KoldMarket API running on http://localhost:${PORT}`)
})

export default app
