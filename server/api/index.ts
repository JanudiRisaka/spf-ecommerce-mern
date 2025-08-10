import '../src/env';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import serverless from 'serverless-http';
import app from '../src/app';

const handler = serverless(app);

export default async (req: VercelRequest, res: VercelResponse) =>
  handler(req as any, res as any);
