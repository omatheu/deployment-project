import Queue from 'bee-queue';
import { getRedisClient } from './redis';

interface EmailJob {
  to: string;
  subject: string;
}

interface NotificationJob {
  userId: string;
  message: string;
}

interface ProcessingJob {
  data: any;
}

const redisClient = getRedisClient();

export const createQueue = (name: string) => {
  return new Queue(name, {
    redis: {
      host: process.env.REDIS_HOST || 'redis',
      port: parseInt(process.env.REDIS_PORT || '6379'),
    },
    removeOnSuccess: true,
    removeOnFailure: true,
    isWorker: true
  });
};

export const emailQueue = createQueue('email');
export const notificationQueue = createQueue('notification');
export const processingQueue = createQueue('processing');

// Process jobs
emailQueue.process(async (job: Queue.Job<EmailJob>) => {
  console.log('Processing email job:', job.data);
  // Add your email processing logic here
});

notificationQueue.process(async (job: Queue.Job<NotificationJob>) => {
  console.log('Processing notification job:', job.data);
  // Add your notification processing logic here
});

processingQueue.process(async (job: Queue.Job<ProcessingJob>) => {
  console.log('Processing data job:', job.data);
  // Add your data processing logic here
}); 