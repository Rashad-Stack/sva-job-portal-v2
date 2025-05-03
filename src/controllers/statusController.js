import prisma from '../DB/db.config.js';

// Fetch all statuses
export const fetchStatuses = async (req, res) => {
  try {
    const statuses = await prisma.status.findMany();
    res.status(200).json({
      success: true,
      message: 'Statuses fetched successfully',
      data: statuses,
    });
  } catch (error) {
    console.error('Error fetching statuses:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Create a status
export const createStatus = async (req, res) => {
  const { name } = req.body;
  try {
    const newStatus = await prisma.status.create({
      data: { name },
    });
    res.status(201).json({
      success: true,
      message: 'Status created successfully',
      data: newStatus,
    });
  } catch (error) {
    console.error('Error creating status:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Update status
export const updateStatus = async (req, res) => {
  const { id, name } = req.body;

  try {
    const existingStatus = await prisma.status.findUnique({ where: { id } });

    if (!existingStatus) {
      return res.status(404).json({
        success: false,
        message: 'Status not found',
      });
    }

    const updatedStatus = await prisma.status.update({
      where: { id },
      data: { name },
    });

    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      data: updatedStatus,
    });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating status',
    });
  }
};

// Delete status
export const deleteStatus = async (req, res) => {
  const { id } = req.body;

  try {
    const existingStatus = await prisma.status.findUnique({ where: { id } });

    if (!existingStatus) {
      return res.status(404).json({
        success: false,
        message: 'Status not found',
      });
    }

    await prisma.status.delete({ where: { id } });

    res.status(200).json({
      success: true,
      message: 'Status deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting status:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting status',
    });
  }
};
