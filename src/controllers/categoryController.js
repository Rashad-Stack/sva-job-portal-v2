import prisma from "../DB/db.config.js";

// Fetch all category
export const fetchCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const fetchSingleCategory = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "category not found" });
    }

    res.status(200).json({
      success: true,
      message: "category fetched successfully",
      data: category,
    });
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Create a category
export const createCategory = async (req, res) => {
  const { name } = req.body;
  console.log(req.body);
  try {
    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update category
export const updateCategory = async (req, res) => {
  const { name } = req.body;
  const id = req?.params?.id;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name },
    });

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  const id = req.params.id;

  try {
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Delete the category
    await prisma.category.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting category",
    });
  }
};
