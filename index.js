import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";

// Import routes
import authenticateUser from "./src/middleware/auth.js";
import applicationRouter from "./src/routes/applicationRoutes.js";
import categoryRoute from "./src/routes/categoryRoutes.js";
import changeLogRoute from "./src/routes/changeLogRoute.js";
import formRouter from "./src/routes/formRoutes.js";
import jobIndexRouter from "./src/routes/jobIndexRoutes.js";
import jobRoute from "./src/routes/jobRoutes.js";
import statusRoutes from "./src/routes/statusRoutes.js";
import userRoute from "./src/routes/userRoutes.js";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const port = process.env.PORT || 3000;

// Security configurations
app.set("trust proxy", ["loopback", "linklocal", "uniquelocal"]);

// Apply security middleware
app.use(helmet());
app.use(morgan("dev"));

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: true,
  message: "Too many requests from this IP, please try again in an hour",
  keyGenerator: (req) => req.ip,
  trustProxy: true,
});

// Apply rate limiting to API routes
app.use("/api", limiter);

// Body parser middleware
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:5174",
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:3001",
    "https://softvence-skill-job.vercel.app",
    "https://job-portal-dashboard-v2.netlify.app",
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
  maxAge: 3600,
  exposedHeaders: ["Content-Type", "Authorization"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],
};
app.use(cors(corsOptions));

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is running",
  });
});

// API Routes
app.use("/api/v2/user", userRoute);
app.use("/api/v2/job", jobRoute);
app.use("/api/v2/category", categoryRoute);
app.use("/api/v2/status", authenticateUser, statusRoutes);
app.use("/api/v2/job-index", authenticateUser, jobIndexRouter);
app.use("/api/v2/job-index/changelog", authenticateUser, changeLogRoute);
app.use("/api/v2/job/application", applicationRouter);
app.use("/api/v2/job/forms", authenticateUser, formRouter);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal server error",
  });
});

// Start server
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Handle unhandled rejections
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});
