import express from "express";
import {
  createForm,
  deleteForm,
  fetchForms,
  showForm,
  updateForm,
} from "../controllers/formController.js";

const formRouter = express.Router();

formRouter.get("/all", fetchForms);
formRouter.get("/:id", showForm);
formRouter.post("/create", createForm);
formRouter.put("/update/:id", updateForm);
formRouter.delete("/delete/:id", deleteForm);

export default formRouter;
