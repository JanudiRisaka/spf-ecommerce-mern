// server/src/index.ts
import express from 'express';
import dotenv from 'dotenv';
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

// Load environment variables
dotenv.config();

const app = express();

const startServer = async () => {
  try {
    // Connect to the database
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
    app.get('/api/health', (req, res) => {
      console.log("Health check endpoint was hit!");
      res.status(200).json({ status: 'ok', message: 'Server is up and running.' });
    });
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/users', userRoutes);
    app.use('/api/v1/products', productRoutes);
    app.use('/api/v1/orders', orderRoutes);
    app.use('/api/v1/inquiries', inquiryRoutes);
    app.use('/api/v1/upload', uploadRoutes);
    app.use('/api/v1/payment', paymentRoutes);
    app.use('/api/v1/dashboard', dashboardRoutes);
    app.use('/api/v1/chatbot', chatbotRoutes);
    app.get('/api/v1', (req, res) => {
      res.json({ message: 'Shakthi Picture Framing API is running!' });
    });

  } catch (error) {
    console.error("Failed to start the server:", error);
    // Even if DB fails, define a route to report the error
     app.get('/api/health', (req, res) => {
        let errorMessage = "An unknown error occurred during server startup.";
        // Check if the error is an actual Error object
        if (error instanceof Error) {
            // If it is, we can safely access its message property
            errorMessage = error.message;
        }
        res.status(500).json({
            status: 'error',
            message: 'Server failed to start, likely a database connection issue.',
            error: errorMessage
        });
    });
  }
};

// Start the server initialization
startServer();

// This export is what Vercel uses
export default app;