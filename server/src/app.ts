import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

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

dotenv.config();

const app = express();

// Kick off the (cached) DB connect once; don't await at top-level
const dbReady = connectDB();

app.use(async (_req, _res, next) => {
  await dbReady;
  next();
});

// Security headers (you can also do app.use(helmet()) above this if you want the full set)
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "script-src": ["'self'", "https://js.stripe.com"],
      "connect-src": ["'self'", "https://api.stripe.com", "https://r.stripe.com"],
      "frame-src": ["'self'", "https://js.stripe.com", "https://hooks.stripe.com"],
      "img-src": ["'self'", "https://*.stripe.com", "data:"],
    },
  })
);

const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({ origin: clientUrl, methods: ['GET','POST','PUT','DELETE'], credentials: true }));
app.use(express.json());

// Routes (now safe to use DB)
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

export default app;
