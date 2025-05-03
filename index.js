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

// Public routes (no authentication required)
app.get('/', (req, res) => {
  res.send('Home Page');
});

// Apply authentication middleware to all other routes
app.use(authenticateUser);

// Protected routes
import userRoute from './src/routes/userRoute.js';
import jobRoute from './src/routes/jobRoute.js';
import categoryRoute from './src/routes/categoryRoutes.js';

app.use('/api/v2/user', userRoute);
app.use('/api/v2/job', jobRoute);
app.use('/api/v2/category', categoryRoute);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
