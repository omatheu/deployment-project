import express from 'express';
import cors from 'cors';
import { register } from 'prom-client';
import { logger } from './config/logger';
import { httpRequestDuration, totalRequests } from './config/metrics';
import { cacheMiddleware } from './config/redis';
import { emailQueue, notificationQueue } from './config/queue';
import userRoutes from './routes/userRoutes';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (error) {
    logger.error('Error generating metrics:', error);
    res.status(500).end();
  }
});

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    httpRequestDuration
      .labels(req.method, req.route?.path || req.path, res.statusCode.toString())
      .observe(duration / 1000);
    totalRequests.inc();
    logger.info(`${req.method} ${req.url} ${res.statusCode} ${duration}ms`);
  });
  next();
});

// Example route with caching
app.get('/api/data', cacheMiddleware('api-data'), async (req, res) => {
  try {
    // Simulate some data processing
    const data = { message: 'Hello from the API!' };
    
    // Add to queue for async processing
    await emailQueue.add({ to: 'user@example.com', subject: 'Data processed' });
    await notificationQueue.add({ userId: '123', message: 'Data processed' });
    
    res.json(data);
  } catch (error) {
    logger.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
}); 