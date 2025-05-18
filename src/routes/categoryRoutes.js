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
categoryRouter.put("/update/:id", updateCategory);
categoryRouter.delete("/delete/:id", deleteCategory);

export default categoryRouter;
