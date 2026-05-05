const PORT = parseInt(process.env['PORT'] ?? '3000', 10);
const NODE_ENV = process.env['NODE_ENV'] ?? 'development';

export const config = {
  port: PORT,
  nodeEnv: NODE_ENV,
} as const;
