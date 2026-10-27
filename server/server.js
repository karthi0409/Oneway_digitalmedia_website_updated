import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import { env } from './config/env.js';
import { connectDB, isDbConnected } from './config/db.js';
import enquiryRoutes from './routes/enquiries.js';
import projectRoutes from './routes/projects.js';
import { notFoundHandler, errorHandler } from './middleware/errors.js';
import { apiLimiter } from './middleware/rateLimit.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security Headers with Content Security Policy for Google Fonts, Maps & SVG
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
        imgSrc: ["'self'", 'data:', 'https:', 'blob:'],
        frameSrc: ["'self'", 'https://www.google.com', 'https://maps.google.com'],
        connectSrc: ["'self'", env.CLIENT_URL, 'http://localhost:5173'],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// Cross-Origin Resource Sharing
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin) return callback(null, true);
      const allowedOrigins = [
        env.CLIENT_URL,
        'http://localhost:5173',
        'http://localhost:3000',
        'http://127.0.0.1:5173',
      ];
      if (allowedOrigins.includes(origin) || env.NODE_ENV === 'development') {
        return callback(null, true);
      }
      return callback(new Error('CORS policy: Not allowed by Access-Control-Allow-Origin'));
    },
    credentials: true,
  })
);

// Request Logger
if (env.NODE_ENV !== 'test') {
  app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// Body Parser with strict payload size limit (20kb)
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));

// Apply general API rate limiter to all /api routes
app.use('/api', apiLimiter);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = isDbConnected() ? 'connected' : 'disconnected';
  res.json({
    status: 'ok',
    service: 'One Way Digital Media API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: dbStatus,
    environment: env.NODE_ENV,
  });
});

// Mount Resource Routes
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/projects', projectRoutes);

// Catch-all 404 for unmatched API calls
app.use('/api/*', notFoundHandler);

// Production Static Serving
const clientDistPath = path.resolve(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

// Single Page Application Fallback
app.get('*', (req, res, next) => {
  // If request begins with /api, delegate to API error handler
  if (req.originalUrl.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(clientDistPath, 'index.html'), (err) => {
    if (err) {
      // In development, client/dist might not exist yet if only running backend
      res.status(200).send(`
        <!doctype html>
        <html>
          <head><title>One Way Digital Media API Server</title></head>
          <body style="font-family: sans-serif; background: #02060e; color: #fff; text-align: center; padding: 4rem;">
            <h1 style="color: #8ac616;">One Way Digital Media Backend API</h1>
            <p>API Server running on port ${env.PORT}.</p>
            <p>Development client is available at <a href="${env.CLIENT_URL}" style="color: #4ec2be;">${env.CLIENT_URL}</a></p>
          </body>
        </html>
      `);
    }
  });
});

// Central Error Handler
app.use(errorHandler);

// Start Server
async function startServer() {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(`[Server] One Way Digital Media API running on http://localhost:${env.PORT}`);
    console.log(`[Server] Environment: ${env.NODE_ENV}`);
  });
}

startServer();

export default app;
