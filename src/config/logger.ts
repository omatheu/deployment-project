import winston from 'winston';
import { format } from 'winston';

interface LogEntry {
  level: string;
  message: string;
  timestamp: string;
  [key: string]: any;
}

const { combine, timestamp, printf, colorize } = format;

const customFormat = printf(({ level, message, timestamp, ...metadata }: LogEntry) => {
  let msg = `${timestamp} [${level}] : ${message}`;
  if (Object.keys(metadata).length > 0) {
    msg += ` ${JSON.stringify(metadata)}`;
  }
  return msg;
});

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp(),
    colorize(),
    customFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
}); 