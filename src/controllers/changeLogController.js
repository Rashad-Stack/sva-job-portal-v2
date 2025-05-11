import prisma from "../DB/db.config.js";
export const fetchChangeLog = async (req, res) => {
  try {
    const changeLog = await prisma.changeLog.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        jobIndex: false, // Fetch all fields to identify potential missing data
      },
    });

    res.status(200).json({
      success: true,
      message: "ChangeLog fetched successfully",
      data: changeLog,
    });
  } catch (error) {
    console.error("Error fetching ChangeLog:", error);

    // Check if the error is specific to `JobIndex` relation
    if (error.message.includes("JobIndex not found")) {
      res.status(404).json({
        success: false,
        message: "Some JobIndex records are missing or invalid",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};
