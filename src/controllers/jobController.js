import prisma from "../DB/db.config.js";

export const fetchJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany();

    return res.status(200).json({
      success: true,
      message: "All job fetched sucessfully",
      data: jobs,
    });
  } catch (error) {
    console.error("Error fetching Jobs:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const createJob = async (req, res) => {
  try {
    const modaratorId = req.modarator?.id;

    const {
      title,
      companyName,
      numberOfHiring,
      appliedBy,
      location,
      jobType,
      jobLevel,
      category,
      jobNature,
      shift,
      deadline,
    } = req.body;

    const newjob = await prisma.job.create({
      data: {
        modaratorId,
        title,
        companyName,
        numberOfHiring,
        appliedBy,
        location,
        jobType,
        jobLevel,
        category,
        jobNature,
        shift,

        deadline: new Date(deadline),
      },
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: newjob,
    });
  } catch (error) {
    console.error("Error creating job:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating job",
      error: error.message,
    });
  }
};

export const showJob = async (req, res) => {
  const jobId = req.params.id;
  const job = await prisma.job.findFirst({
    where: {
      id: jobId,
    },
  });

  return res.status(200).json({
    success: true,
    message: "Single job Fetch Successfull",
    data: job,
  });
};

export const updateJob = async (req, res) => {
  const jobId = req.params.id;

  const {
    title,
    companyName,
    numberOfHiring,
    appliedBy,
    location,
    jobType,
    jobLevel,
    category,
    jobNature,
    shift,
    deadline,
  } = req.body;

  try {
    // 🔍 Check if the job exists first
    const existingJob = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!existingJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // ✅ Proceed with update
    const updateData = await prisma.job.update({
      where: { id: jobId },
      data: {
        title,
        companyName,
        numberOfHiring,
        appliedBy,
        location,
        jobType,
        jobLevel,
        category,
        jobNature,
        shift,
        deadline,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: updateData,
    });
  } catch (error) {
    console.error("Error updating job:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating job",
      error: error.message,
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await prisma.job.delete({
      where: { id: jobId },
    });

    return res
      .status(200)
      .json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    return res.status(500).json({
      message: "Failed to delete job",
      error: error.message,
    });
  }
};
