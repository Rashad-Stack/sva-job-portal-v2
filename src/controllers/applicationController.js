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
        comments: {
          include: {
            user: true,
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
        comments: {
          include: {
            user: true,
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
      expectSalary,
      cv,
      githubUrl,
      cpProfile,
      jobId,
      othersFields,
    } = req.body;

    const application = await prisma.application.create({
      data: {
        fullName,
        email,
        phoneNumber,
        expectSalary: Number(expectSalary),
        cv,
        githubUrl,
        cpProfile,
        jobId,
        othersFields,
      },
    });

    res.status(201).json({ success: true, data: application });
  } catch (error) {
    console.error("Error fetching application:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const user = req.user;

    // Create a clean copy of the request body
    let data = { ...req.body };

    // Handle comment separately if it exists
    const commentText = data.comment;
    const existingCommentId = data.commentId;
    delete data.comment;
    delete data.commentId;

    // Handle comment creation or update
    if (commentText) {
      if (existingCommentId) {
        // Update existing comment
        await prisma.comment.update({
          where: {
            id: existingCommentId,
          },
          data: {
            comment: commentText,
            userId: user.id,
          },
        });
      } else {
        // Create new comment
        data.comments = {
          create: {
            comment: commentText,
            userId: user.id,
            applicationId,
          },
        };
      }
    }

    // Parse joining date if it exists
    if (data.joining) {
      data.joining = new Date(data.joining);
    }

    const application = await prisma.application.update({
      where: {
        id: applicationId,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
      include: {
        comments: {
          include: {
            user: true,
          },
        },
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
    console.error("Error updating application:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
