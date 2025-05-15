import express from "express";
import {
  createApplication,
  fetchApplications,
  showApplication,
} from "../controllers/applicationController.js";

const applicationRouter = express.Router();

applicationRouter.get("/all", fetchApplications);
applicationRouter.get("/:id", showApplication);
applicationRouter.post("/create", createApplication);

export default applicationRouter;
