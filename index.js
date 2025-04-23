import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

import cors from "cors";

const port = process.env.PORT || 3000;
const app = express();
const allowedOrigins = ["http://localhost:5174", "http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("home page");
});
app.use(express.json());

import useRoute from "./routes/userRoutes.js";
app.use("/api/v1/user", useRoute);
import jobRoute from "./routes/jobRoutes.js";
app.use("/api/v1/job", jobRoute);

app.listen(port, () => {
  console.log("Server Running on", port);
});
