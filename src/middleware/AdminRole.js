import jwt from "jsonwebtoken";
import { prisma } from "../utils/prismaClient.js"; // Correct the path to match your file structure

const verifyAdmin = (requiredRole, modaratorRole) => {
  return async (req, res, next) => {
    try {
      const token =
        req.cookies.token || req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "No token provided, access denied.",
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded.id) {
        return res.status(401).json({
          success: false,
          message: "Invalid token, user ID is missing.",
        });
      }

      const modarator = await prisma.modarator.findUnique({
        where: { id: decoded.id }, // Match `id` from the decoded token
      });

      if (!modarator) {
        return res
          .status(401)
          .json({ success: false, message: "User not found, access denied." });
      }

      if (modarator.role !== requiredRole && modarator.role !== modaratorRole) {
        return res
          .status(403)
          .json({ success: false, message: "Forbidden: Insufficient role" });
      }

      req.modarator = modarator;
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  };
};

export default verifyAdmin;
