import express, { Request, Response } from 'express';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler } from './middleware/errorHandler';
import { healthResponseSchema } from './schemas/healthSchema';

export const app = express();

app.use(express.json());
app.use(requestLogger);

app.get('/health', (_req: Request, res: Response) => {
  const body = healthResponseSchema.parse({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
  res.json(body);
});

app.use(errorHandler);
