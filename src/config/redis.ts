import Redis from 'ioredis';
import { Request, Response, NextFunction } from 'express';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export const getRedisClient = () => redis;

export const cacheMiddleware = (key: string, ttl: number = 3600) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cacheKey = `${key}:${req.originalUrl}`;
      const cachedData = await redis.get(cacheKey);
      
      if (cachedData) {
        const data = JSON.parse(cachedData);
        return res.json(data);
      }

      // Store the original json method
      const originalJson = res.json;
      
      // Override the json method to cache the response
      res.json = function(body: any) {
        redis.setex(cacheKey, ttl, JSON.stringify(body));
        return originalJson.call(this, body);
      };

      next();
    } catch (error) {
      console.error('Redis error:', error);
      next();
    }
  };
}; 