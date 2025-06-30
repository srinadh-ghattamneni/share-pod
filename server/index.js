import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import fileRoutes from './routes/file.js';
import rateLimit from 'express-rate-limit';
import cron from 'node-cron';
import { deleteOldFiles } from './utils/cleanup.js';

dotenv.config();
connectDB();

const app = express();

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50,
  message: "Too many requests. Please try again later.",
});

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(limiter);
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);

// Cron job to delete files every 10 minutes
cron.schedule('*/10 * * * *', deleteOldFiles);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
