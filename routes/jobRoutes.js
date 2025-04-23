import express from "express";
import jwt from "jsonwebtoken";
import verifyRole from "../middleware/verifyToken.js";
import {
  createJob,
  deleteJob,
  fetchJobs,
  showJob,
  updateJob,
} from "../controllers/jobController.js";

const jobRoute = express.Router();

// Public route to fetch all jobs (no auth)
jobRoute.get("/all", fetchJobs);

// Admin-only route to create a job
jobRoute.post("/create", createJob);

// Public route to view a job by ID
jobRoute.get("/:id", showJob);

// Admin-only route to update a job
jobRoute.put("/update/:id", verifyRole("Admin", "User"), updateJob);

// Admin-only route to delete a job
jobRoute.delete("/delete/:id", verifyRole("Admin", "User"), deleteJob);

export default jobRoute;
