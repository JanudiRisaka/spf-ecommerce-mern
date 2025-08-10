// server/api/index.ts
import '../src/env';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import serverless from 'serverless-http';
import app from '../src/app';

// Wrap Express app in a serverless handler
const handler = serverless(app);

// Vercel Node Function expects a default export
export default async (req: VercelRequest, res: VercelResponse) => handler(req as any, res as any);
