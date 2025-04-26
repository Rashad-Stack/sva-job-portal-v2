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

Modaratoroute.get("/all", fetchModarators);
Modaratoroute.post("/create", createModarator);
Modaratoroute.get("/:id", verifyRole("ADMIN", "MODARATOR"), showModarator);
Modaratoroute.put(
  "/update/:id",
  verifyRole("ADMIN", "MODARATOR"),
  updateModarator
);
Modaratoroute.delete("/delete/:id", verifyRole("ADMIN"), deleteModarator);
Modaratoroute.post("/login", LoginModarator);
Modaratoroute.post("/logout", logoutModarator);

export default Modaratoroute;
