import prisma from "../DB/db.config.js";

export const fetchApplications = async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      include: {
        job: {
          include: {
            category: true,
          },
        },
      },
    });
    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const showApplication = async (req, res) => {
  const applicationId = req.params.id;

  try {
    const application = await prisma.application.findUnique({
      where: { id: parseInt(applicationId) },
      include: {
        job: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ success: true, data: application });
  } catch (error) {
    console.error("Error fetching application:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createApplication = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      ExpectSalary,
      cv,
      githubUrl,
      cpProfile,
      jobId,
    } = req.body;

    const application = await prisma.application.create({
      data: {
        fullName,
        email,
        phoneNumber,
        ExpectSalary: Number(ExpectSalary),
        cv,
        githubUrl,
        cpProfile,
        jobId,
      },
    });

    res.status(201).json({ success: true, data: application });
  } catch (error) {
    console.error("Error fetching application:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
