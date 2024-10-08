import express from 'express';
import dotenv from 'dotenv';
import winston from 'winston';

// Imports the Google Cloud client library for Winston
import { LoggingWinston } from '@google-cloud/logging-winston';

const loggingWinston = new LoggingWinston();
dotenv.config();

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    loggingWinston,
  ],
});

console.log('process.env');
console.log(process.env.HOST);

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 8080;

const app = express();

app.get('/', (req, res) => {
  console.log('in hello function');
  logger.info('Info level log');
  logger.warn('Warn level log');
  logger.error('Error level log');
  res.send({ message: 'Hello API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
