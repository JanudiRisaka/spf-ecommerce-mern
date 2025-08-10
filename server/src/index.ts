import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import connectDB from './config/db';
import cors from 'cors';
import helmet from 'helmet';


// Import routes
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import inquiryRoutes from './routes/inquiryRoutes';
import uploadRoutes from './routes/uploadRoutes';
import paymentRoutes from './routes/paymentRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import chatbotRoutes from './routes/chatbotRoutes';

// Load environment variables from .env file
dotenv.config();

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to the database FIRST
    await connectDB();
    console.log("Successfully connected to MongoDB.");

    // --- Middleware ---
    app.use(helmet.contentSecurityPolicy({ /* ... your helmet config ... */ }));
    const clientUrl = process.env.CLIENT_URL;
    if (!clientUrl) {
      console.error("CRITICAL: CLIENT_URL environment variable is not set.");
    }
    app.use(cors({
      origin: clientUrl,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }));
    app.use(express.json());

    // --- Routes ---
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/users', userRoutes);
    app.use('/api/v1/products', productRoutes);
    app.use('/api/v1/orders', orderRoutes);
    app.use('/api/v1/inquiries', inquiryRoutes);
    app.use('/api/v1/upload', uploadRoutes);
    app.use('/api/v1/payment', paymentRoutes);
    app.use('/api/v1/dashboard', dashboardRoutes);
    app.use('/api/v1/chatbot', chatbotRoutes);

    // --- Health Check for Vercel ---
    app.get('/api/health', (req, res) => {
      res.status(200).json({ status: 'ok', message: 'Server is healthy.' });
    });

  } catch (error) {
    console.error("Failed to connect to DB, server setup aborted:", error);
    // If DB fails, provide a specific error response
    app.get('/api/health', (req, res) => {
        let errorMessage = "An unknown error occurred during server startup.";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(500).json({
            status: 'error',
            message: 'Server failed to start due to a database connection issue.',
            error: errorMessage
        });
    });
  }
};

// --- This part is for LOCAL development ONLY ---
// Vercel will ignore this app.listen() block because it imports the `app` object directly.
if (process.env.NODE_ENV === 'development') {
    app.listen(PORT, () => {
        console.log(`Server is listening for local development on port ${PORT}`);
    });
}

// Initialize the server setup
startServer();

// --- This export is CRITICAL for Vercel ---
export default app;
