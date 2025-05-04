import jwt from "jsonwebtoken";
import prisma from "../DB/db.config.js";

const verifyRole = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const token =
        req.cookies?.svaAuth || req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Access denied. No token provided.",
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded?.id) {
        return res.status(401).json({
          success: false,
          message: "Invalid token. User ID missing.",
        });
      }

      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Access denied. User not found.",
        });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden. Insufficient permissions.",
        });
      }

      req.user = user;
      next();
    } catch (err) {
      console.error("verifyRole error:", err);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  };
};

export default verifyRole;
