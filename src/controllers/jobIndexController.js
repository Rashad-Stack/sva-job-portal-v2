import prisma from "../DB/db.config.js";

// Fetch all JobIndexes
export const fetchJobIndex = async (req, res) => {
  try {
    const jobIndexes = await prisma.jobIndex.findMany({
      include: {
        status: true,
        category: true,
        creator: { select: { id: true, name: true, email: true } },
        updater: { select: { id: true, name: true, email: true } },
      },
    });

    res.status(200).json({
      success: true,
      message: "JobIndexes fetched successfully",
      data: jobIndexes,
    });
  } catch (error) {
    console.error("Error fetching job indexes:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Show JobIndex by ID
export const showJobIndexById = async (req, res) => {
  const jobIndexId = req.params.id;

  try {
    const jobIndex = await prisma.jobIndex.findUnique({
      where: { id: jobIndexId },
      include: {
        status: true,
        category: true,
        creator: { select: { id: true, name: true } },
        updater: { select: { id: true, name: true } },
      },
    });

    if (!jobIndex) {
      return res
        .status(404)
        .json({ success: false, message: "JobIndex not found" });
    }

    res.status(200).json({
      success: true,
      message: "JobIndex fetched successfully",
      data: jobIndex,
    });
  } catch (error) {
    console.error("Error fetching jobIndex:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Create JobIndex
export const createJobIndex = async (req, res) => {
  const userId = req.user?.id;
  const {
    title,
    jobPost,
    sheetLink,
    adminAccess,
    candidateFormLink,
    statusId,
    categoryId,
  } = req.body;

  try {
    // Create the JobIndex
    const newJobIndex = await prisma.jobIndex.create({
      data: {
        title,
        jobPost,
        sheetLink,
        adminAccess,
        candidateFormLink,
        statusId,
        categoryId,
        createdBy: userId,
      },
    });

    // Create ChangeLog entry
    await prisma.changeLog.create({
      data: {
        userId,
        jobIndexId: newJobIndex.id,
        action: "ADD",
        newValue: JSON.stringify({
          title,
          jobPost,
          sheetLink,
          adminAccess,
          candidateFormLink,
          statusId,
          categoryId,
        }),
      },
    });

    // Respond
    res.status(201).json({
      success: true,
      message: "JobIndex created successfully",
      data: newJobIndex,
    });
  } catch (error) {
    console.error("Error creating jobIndex:", error);
    res.status(500).json({
      success: false,
      message: "Error creating jobIndex",
    });
  }
};

// Update JobIndex
export const updateJobIndex = async (req, res) => {
  const userId = req.user?.id;
  const jobIndexId = req.params.id;
  const {
    title,
    jobPost,
    sheetLink,
    adminAccess,
    candidateFormLink,
    statusId,
    categoryId,
  } = req.body;

  try {
    const existingJobIndex = await prisma.jobIndex.findUnique({
      where: { id: jobIndexId },
    });

    if (!existingJobIndex) {
      return res
        .status(404)
        .json({ success: false, message: "JobIndex not found" });
    }

    // update the JobIndex
    const updatedJobIndex = await prisma.jobIndex.update({
      where: { id: jobIndexId },
      data: {
        title,
        jobPost,
        sheetLink,
        adminAccess,
        candidateFormLink,
        statusId,
        categoryId,
        updatedBy: userId,
      },
    });

    // Create ChangeLog entry
    await prisma.changeLog.create({
      data: {
        userId,
        jobIndexId: jobIndexId,
        action: "EDIT",
        oldValue: JSON.stringify(existingJobIndex),
        newValue: JSON.stringify({
          title,
          jobPost,
          sheetLink,
          adminAccess,
          candidateFormLink,
          statusId,
          categoryId,
        }),
      },
    });

    res.status(200).json({
      success: true,
      message: "JobIndex updated successfully",
      data: updatedJobIndex,
    });
  } catch (error) {
    console.error("Error updating jobIndex:", error);
    res
      .status(500)
      .json({ success: false, message: "Error updating jobIndex" });
  }
};

// Delete JobIndex
export const deleteJobIndex = async (req, res) => {
  const userId = req.user?.id;
  const jobIndexId = req.params.id;

  try {
    const jobIndex = await prisma.jobIndex.findUnique({
      where: { id: jobIndexId },
    });

    if (!jobIndex) {
      return res
        .status(404)
        .json({ success: false, message: "JobIndex not found" });
    }

    // Create a change log BEFORE deletion
    await prisma.changeLog.create({
      data: {
        userId,
        jobIndexId,
        action: "DELETE",
        oldValue: JSON.stringify({
          title: jobIndex.title,
          jobPost: jobIndex.jobPost,
          sheetLink: jobIndex.sheetLink,
          adminAccess: jobIndex.adminAccess,
          candidateFormLink: jobIndex.candidateFormLink,
          statusId: jobIndex.statusId,
          categoryId: jobIndex.categoryId,
        }),
      },
    });

    // Delete the job index
    await prisma.jobIndex.delete({ where: { id: jobIndexId } });

    res
      .status(200)
      .json({
        success: true,
        message: "JobIndex deleted and logged successfully",
      });
  } catch (error) {
    console.error("Error deleting jobIndex:", error);
    res
      .status(500)
      .json({ success: false, message: "Error deleting jobIndex" });
  }
};
