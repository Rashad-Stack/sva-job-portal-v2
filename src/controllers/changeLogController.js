import prisma from "../DB/db.config.js";

export const fetchChangeLog = async (req, res) => {
  try {
    const changeLogs = await prisma.changeLog.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true, role: true },
        },
        jobIndex: {
          select: { id: true, title: true },
        },
      },
      orderBy: {
        timestamp: "desc",
      },
    });

    res.status(200).json({ success: true, data: changeLogs });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch change logs.",
        error: error.message,
      });
  }
};
