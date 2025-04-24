import express from "express";
import verifyRole from "../middleware/AdminRole.js";
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

Modaratoroute.get("/all", verifyRole("Admin"), fetchModarators);
Modaratoroute.post("/create", verifyRole("Admin"), createModarator);
Modaratoroute.get("/:id", verifyRole("Admin", "Modarator"), showModarator);
Modaratoroute.put(
  "/update/:id",
  verifyRole("Admin", "Modarator"),
  updateModarator
);
Modaratoroute.delete("/delete/:id", verifyRole("Admin"), deleteModarator);
Modaratoroute.post("/login", LoginModarator);
Modaratoroute.post("/logout", logoutModarator);

export default Modaratoroute;
