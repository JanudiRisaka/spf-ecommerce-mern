import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';

import './env';               // loads dotenv once
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

// middleware (once each)
app.use(express.json());
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({ origin: clientUrl, credentials: true }));
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "script-src": ["'self'", "https://js.stripe.com"],
      "connect-src": ["'self'", "https://api.stripe.com", "https://r.stripe.com"],
      "frame-src": ["'self'", "https://js.stripe.com", "https://hooks.stripe.com"],
      "img-src": ["'self'", "https:", "data:"],
      // if you use Google Fonts on the client:
      "style-src": ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
      "font-src": ["'self'", "https://fonts.gstatic.com", "data:"]
    }
  }
}));

// DB gate (don’t await at top level)
const dbReady = connectDB();
app.use(async (_req, _res, next) => {
  try { await dbReady; next(); }
  catch (e) { next(e); }
});

// routes that need DB
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/inquiries', inquiryRoutes);
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/chatbot', chatbotRoutes);

app.get('/api/v1', (_req, res) => {
  res.json({ message: 'Shakthi Picture Framing API is running!' });
});

// always respond on errors (no 300s timeouts)
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error('API error:', err?.message || err);
  res.status(500).json({ error: 'Internal Server Error', detail: String(err?.message || err) });
});

export default app;
