import prisma from '../DB/db.config.js';

// Fetch all jobs
export const fetchJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany();

    res.status(200).json({
      success: true,
      message: 'Jobs fetched successfully',
      data: jobs,
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Create a job
export const createJob = async (req, res) => {
  const userId = req.user?.id;

  const {
    title,
    companyName,
    numberOfHiring,
    appliedBy,
    location,
    jobType,
    jobLevel,
    googleForm,
    categoryId,
    jobNature,
    shift,
    deadline,
  } = req.body;

  try {
    const newJob = await prisma.job.create({
      data: {
        userId,
        title,
        companyName,
        numberOfHiring,
        appliedBy,
        location,
        googleForm,
        jobType,
        jobLevel,
        categoryId,
        jobNature,
        shift,
        deadline: new Date(deadline),
      },
    });

    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: newJob,
    });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ success: false, message: 'Error creating job', error: error.message });
  }
};

// Show job by ID
export const showJob = async (req, res) => {
  const jobId = req.params.id;

  try {
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.status(200).json({ success: true, message: 'Job fetched successfully', data: job });
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Update job
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
    googleForm,
    categoryId,
    jobNature,
    shift,
    deadline,
  } = req.body;

  try {
    const existingJob = await prisma.job.findUnique({ where: { id: jobId } });

    if (!existingJob) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: {
        title,
        companyName,
        numberOfHiring,
        appliedBy,
        location,
        jobType,
        jobLevel,
        googleForm,
        categoryId,
        jobNature,
        shift,
        deadline: new Date(deadline),
      },
    });

    res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      data: updatedJob,
    });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ success: false, message: 'Error updating job', error: error.message });
  }
};

// Delete job
export const deleteJob = async (req, res) => {
  const jobId = req.params.id;

  try {
    const existingJob = await prisma.job.findUnique({ where: { id: jobId } });

    if (!existingJob) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    await prisma.job.delete({ where: { id: jobId } });

    res.status(200).json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ success: false, message: 'Error deleting job', error: error.message });
  }
};
