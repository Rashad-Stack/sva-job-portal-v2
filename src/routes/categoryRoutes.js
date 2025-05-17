import express from "express";
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  fetchSingleCategory,
  updateCategory,
} from "../controllers/categoryController.js";
const categoryRouter = express.Router();

categoryRouter.post("/create", createCategory);
categoryRouter.get("/all", fetchCategories);
categoryRouter.get("/:id", fetchSingleCategory);
categoryRouter.put("/update", updateCategory);
categoryRouter.delete("/delete", deleteCategory);

export default categoryRouter;
