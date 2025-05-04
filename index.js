import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authenticateUser from './src/middleware/auth.js';

// Load environment variables
dotenv.config();

// App setup
const app = express();
const port = process.env.PORT || 3000;

// CORS configuration
const allowedOrigins = ['http://localhost:5174', 'http://localhost:5173'];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Public routes
app.get('/', (req, res) => {
  res.send('Home Page');
});

// Add this before the authenticateUser middleware
// app.use((req, res, next) => {
//   console.log('Auth Debug:', {
//     authHeader: req.headers.authorization,
//     cookies: req.cookies,
//     token: req.cookies.token || req.headers.authorization?.split(' ')[1] || 'No token found',
//   });
//   next();
// });

// authentication middleware
// app.use(authenticateUser);

import userRoute from './src/routes/userRoutes.js';
import jobRoute from './src/routes/jobRoutes.js';
import categoryRoute from './src/routes/categoryRoutes.js';
import jobIndexRouter from './src/routes/jobIndexRoutes.js';
import statusRoutes from './src/routes/statusRoutes.js';

// Protected routes
app.use('/api/v2/user', userRoute);
app.use('/api/v2/job', authenticateUser, jobRoute);
app.use('/api/v2/category', authenticateUser, categoryRoute);
app.use('/api/v2/status', authenticateUser, statusRoutes);
app.use('/api/v2/job-index', authenticateUser, jobIndexRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
