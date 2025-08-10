import express, { Router } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import './env';
import connectDB from './config/db';

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import inquiryRoutes from './routes/inquiryRoutes';
import uploadRoutes from './routes/uploadRoutes';
import paymentRoutes from './routes/paymentRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import chatbotRoutes from './routes/chatbotRoutes';

const app = express();

// fast, no-DB routes
app.get('/', (_req, res) => res.status(200).send('API alive'));
app.get('/favicon.ico', (_req, res) => res.status(204).end());
app.get('/api/ping', (_req, res) => res.status(200).send('pong'));
app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.get('/api/db-status', (_req, res) => {
  const states = ['disconnected','connected','connecting','disconnecting','uninitialized'] as const;
  const rs = (mongoose.connection as any).readyState ?? 4;
  res.json({ state: states[rs] ?? 'unknown' });
});

// ✅ Make /api/v1 instant and outside the DB gate
app.get('/api/v1', (_req, res) => {
  res.json({ message: 'Shakthi Picture Framing API is running!' });
});

// middleware (once each)
app.use(express.json());
const allowed = [
  'http://localhost:5173',
  process.env.CLIENT_URL!, // your prod client URL, e.g. https://spf-client.vercel.app
];
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    const ok =
      allowed.includes(origin) ||
      /^https:\/\/<YOUR-CLIENT-PROJECT>-.*\.vercel\.app$/.test(origin); // ← replace
    cb(ok ? null : new Error('Not allowed by CORS'), ok);
  },
  credentials: true,
}));
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "script-src": ["'self'", "https://js.stripe.com"],
      "connect-src": ["'self'", "https://api.stripe.com", "https://r.stripe.com"],
      "frame-src": ["'self'", "https://js.stripe.com", "https://hooks.stripe.com"],
      "img-src": ["'self'", "https:", "data:"],
      "style-src": ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
      "font-src": ["'self'", "https://fonts.gstatic.com", "data:"]
    }
  }
}));

// Lazy DB only for /api/v1/*
const api = Router();
let dbReady: Promise<any> | null = null;
api.use(async (_req, _res, next) => {
  try {
    if (!dbReady) dbReady = connectDB();
    await dbReady;
    next();
  } catch (e) {
    next(e);
  }
});

// DB-backed routes
api.use('/auth', authRoutes);
api.use('/users', userRoutes);
api.use('/products', productRoutes);
api.use('/orders', orderRoutes);
api.use('/inquiries', inquiryRoutes);
api.use('/upload', uploadRoutes);
api.use('/payment', paymentRoutes);
api.use('/dashboard', dashboardRoutes);
api.use('/chatbot', chatbotRoutes);

// Mount router after the instant /api/v1 handler
app.use('/api/v1', api);

// Error handler
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error('API error:', err?.message || err);
  res.status(500).json({ error: 'Internal Server Error', detail: String(err?.message || err) });
});

export default app;
