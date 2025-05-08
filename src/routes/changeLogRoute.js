import express from "express";
import { fetchChangeLog } from "../controllers/changeLogController.js";

const changeLogRoute = express.Router();

changeLogRoute.get("/all", fetchChangeLog);
export default changeLogRoute;
