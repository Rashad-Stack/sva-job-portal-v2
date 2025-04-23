import express from "express";
import AdminRole from "../middleware/AdminRole.js";
import {
  createModarator,
  deleteModarator,
  fetchModarators,
  LoginModarator,
  logoutModarator,
  showModarator,
  updateModarator,
} from "../controllers/ModaratorController.js";

const Modaratoroute = express.Router();

Modaratoroute.get("/all", fetchModarators);
Modaratoroute.post("/create", createModarator);
Modaratoroute.get("/:id", showModarator);
Modaratoroute.put("/update/:id", updateModarator);
Modaratoroute.delete("/delete/:id", deleteModarator);
Modaratoroute.post("/login", LoginModarator);
Modaratoroute.post("/logout", logoutModarator);

export default Modaratoroute;
