import { register, collectDefaultMetrics, Counter, Gauge, Histogram } from 'prom-client';

// Enable default metrics (CPU, memory, etc.)
collectDefaultMetrics();

// Custom metrics
export const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
});

export const activeUsers = new Gauge({
  name: 'active_users',
  help: 'Number of active users',
});

export const totalRequests = new Counter({
  name: 'total_requests',
  help: 'Total number of requests',
});

export const memoryUsage = new Gauge({
  name: 'nodejs_memory_usage_bytes',
  help: 'Memory usage in bytes',
  labelNames: ['type'],
});

// Function to update memory metrics
export const updateMemoryMetrics = () => {
  const memory = process.memoryUsage();
  memoryUsage.set({ type: 'heap' }, memory.heapUsed);
  memoryUsage.set({ type: 'rss' }, memory.rss);
  memoryUsage.set({ type: 'external' }, memory.external);
};

// Update memory metrics every 5 seconds
setInterval(updateMemoryMetrics, 5000); 