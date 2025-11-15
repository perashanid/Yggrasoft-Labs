import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { errorHandler, notFoundHandler } from '../server/src/middleware/errorHandler';
import { apiLimiter } from '../server/src/middleware/rateLimiter';
import connectDB from '../server/src/config/database';

// Import routes
import contactRoutes from '../server/src/routes/contactRoutes';
import domainRoutes from '../server/src/routes/domainRoutes';
import projectRoutes from '../server/src/routes/projectRoutes';
import newsletterRoutes from '../server/src/routes/newsletterRoutes';
import settingsRoutes from '../server/src/routes/settingsRoutes';
import authRoutes from '../server/src/routes/authRoutes';
import reviewRoutes from '../server/src/routes/reviewRoutes';
import blogRoutes from '../server/src/routes/blogRoutes';
import analyticsRoutes from '../server/src/routes/analyticsRoutes';

// Load environment variables
dotenv.config();

// Connect to MongoDB (cached connection for serverless)
let cachedDb: any = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  cachedDb = await connectDB();
  return cachedDb;
}

const app: Application = express();

// Security middleware with custom CSP to allow external images
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));

// Logging middleware
app.use(morgan('combined'));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting middleware
app.use('/api/', apiLimiter);

// Health check route
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Yggdrasil API is running' });
});

// API routes
app.use('/api/contacts', contactRoutes);
app.use('/api/domains', domainRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/analytics', analyticsRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handling middleware
app.use(errorHandler);

// Connect to database before handling requests
app.use(async (_req, _res, next) => {
  await connectToDatabase();
  next();
});

export default app;
