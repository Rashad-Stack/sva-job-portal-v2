const verifyRole = (requiredRole, alternateRole) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies.token.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "No token provided, access denied.",
        });
      }

      // Decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded);

      const modarator = await prisma.modarator.findUnique({
        where: { id: decoded.id },
      });

      if (!modarator) {
        return res.status(401).json({
          success: false,
          message: "Modarator not found, access denied.",
        });
      }

      // Role check
      if (modarator.role !== requiredRole && modarator.role !== alternateRole) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: Insufficient role",
        });
      }

      // ✅ Attach once, cleanly
      req.modarator = {
        id: modarator.id,
        role: modarator.role,
        name: modarator.name, // optional, useful for logging
        email: modarator.email, // optional
      };

      console.log("Modarator attached to request:", req.modarator);
    } catch (err) {
      console.error("JWT or Prisma Error:", err);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  };
};

export default verifyRole;
