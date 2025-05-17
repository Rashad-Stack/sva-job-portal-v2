import express from "express";
import {
  createApplication,
  fetchApplications,
  showApplication,
} from "../controllers/applicationController.js";
import authenticateUser from "../middleware/auth.js";

const applicationRouter = express.Router();

applicationRouter.post("/create", createApplication);

applicationRouter.use(authenticateUser);
applicationRouter.get("/all", fetchApplications);
applicationRouter.get("/:id", showApplication);

export default applicationRouter;
