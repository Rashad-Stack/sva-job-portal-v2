import express from "express";
import {
  createJob,
  deleteJob,
  fetchJobs,
  showJob,
  updateJob,
} from "../controllers/jobController.js";
import authenticateUser from "../middleware/auth.js";

const jobRouter = express.Router();

jobRouter.get("/all", fetchJobs);
jobRouter.get("/:id", showJob);
jobRouter.post("/create", authenticateUser, createJob);
jobRouter.put("/update/:id", authenticateUser, updateJob);
jobRouter.delete("/delete/:id", authenticateUser, deleteJob);

export default jobRouter;
