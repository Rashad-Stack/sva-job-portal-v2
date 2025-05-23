import express from "express";
import {
  createApplication,
  fetchApplications,
  showApplication,
  updateApplication,
} from "../controllers/applicationController.js";
import authenticateUser from "../middleware/auth.js";

const applicationRouter = express.Router();

applicationRouter.post("/create", createApplication);

applicationRouter.use(authenticateUser);
applicationRouter.get("/all", fetchApplications);
applicationRouter.get("/:id", showApplication);
applicationRouter.patch("/update/:id", updateApplication);

export default applicationRouter;
