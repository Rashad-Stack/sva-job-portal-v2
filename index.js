import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";

// Load environment variables
dotenv.config();

// App setup
const app = express();
const port = process.env.PORT || 3000;

// CORS configuration
const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:3001",
  "https://softvence-skill-job.vercel.app",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Set secure HTTP headers
app.use(helmet());
app.use(morgan("dev"));

// Limit request from same api
const limit = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP. please try again in an hour!",
});

//  Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Prevent parameter Pollution/duplication
app.use(
  hpp({
    whitelist: [
      "duration",
      "maxGroupSize",
      "ratingsAverage",
      "ratingQuantity",
      "price",
      "startDates",
      "durationWeeks",
      "difficulty",
    ],
  })
);

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Public routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

import authenticateUser from "./src/middleware/auth.js";
import applicationRouter from "./src/routes/applicationRoutes.js";
import categoryRoute from "./src/routes/categoryRoutes.js";
import changeLogRoute from "./src/routes/changeLogRoute.js";
import formRouter from "./src/routes/formRoutes.js";
import jobIndexRouter from "./src/routes/jobIndexRoutes.js";
import jobRoute from "./src/routes/jobRoutes.js";
import statusRoutes from "./src/routes/statusRoutes.js";
import userRoute from "./src/routes/userRoutes.js";

// Protected routes
app.use("/api/v2/user", userRoute);
app.use("/api/v2/job", jobRoute);
app.use("/api/v2/category", categoryRoute);
app.use("/api/v2/status", authenticateUser, statusRoutes);
app.use("/api/v2/job-index", authenticateUser, jobIndexRouter);
app.use("/api/v2/job-index/changelog", authenticateUser, changeLogRoute);
app.use("/api/v2/job/application", applicationRouter);
app.use("/api/v2/job/forms", authenticateUser, formRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Error handling
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION 🎆 Shutting down...", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION 🎆 Shutting down...", err);
  server.close(() => process.exit(1));
});
