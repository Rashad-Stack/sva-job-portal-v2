import express from "express";
import verifyRole from "../middleware/AdminRole.js";
import {
  createUser,
  deleteUser,
  fetchUsers,
  loginUser,
  logoutUser,
  showUser,
  updateUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

// Auth routes
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);

// User management
userRouter.get("/:id", showUser);
userRouter.put("/update/:id", updateUser);
userRouter.get("/", fetchUsers);
userRouter.post("/create", createUser);
userRouter.delete("/delete/:id", deleteUser);

export default userRouter;
