import express from "express";
import {
  createStatus,
  deleteStatus,
  fetchSingleStatus,
  fetchStatuses,
  updateStatus,
} from "../controllers/statusController.js";

const statusRouter = express.Router();

statusRouter.get("/all", fetchStatuses);
statusRouter.get("/:id", fetchSingleStatus);
statusRouter.post("/create", createStatus);
statusRouter.put("/update", updateStatus);
statusRouter.delete("/delete", deleteStatus);

export default statusRouter;
