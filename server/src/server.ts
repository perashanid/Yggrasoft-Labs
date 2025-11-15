import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { apiLimiter } from './middleware/rateLimiter';
import connectDB from './config/database';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app: Application = express();
const PORT = process.env.PORT || 5000;

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
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

// Logging middleware
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting middleware
app.use('/api/', apiLimiter);

// Import routes
import contactRoutes from './routes/contactRoutes';
import domainRoutes from './routes/domainRoutes';
import projectRoutes from './routes/projectRoutes';
import newsletterRoutes from './routes/newsletterRoutes';
import settingsRoutes from './routes/settingsRoutes';
import authRoutes from './routes/authRoutes';
import reviewRoutes from './routes/reviewRoutes';
import blogRoutes from './routes/blogRoutes';
import analyticsRoutes from './routes/analyticsRoutes';

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

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../../client/dist');
  app.use(express.static(clientBuildPath));

  // Handle React routing, return all requests to React app
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
} else {
  // 404 handler for development - only for API routes
  app.use(notFoundHandler);
}

// Error handling middleware - must be last
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🌳 Yggdrasil server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
