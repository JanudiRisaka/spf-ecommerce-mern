import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';

// Load environment variables from .env file
dotenv.config();

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// Enable CORS for all origins (you might want to restrict this in production)
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);

// Simple GET route
app.get('/api/v1', (req, res) => {
  res.json({ message: 'Shakthi Picture Framing API is running!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});