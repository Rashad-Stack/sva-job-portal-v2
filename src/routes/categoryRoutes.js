import express from 'express';
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from '../controllers/CategoryController.js';

const categoryRouter = express.Router();

// Get all categories (no role check needed)
categoryRouter.get('/all', fetchCategories);

// Create category (admin only)
categoryRouter.post('/create', createCategory);

// Update category (no role check needed)
categoryRouter.put('/update', updateCategory);

// Delete category (admin only)
categoryRouter.delete('/delete/:id', deleteCategory);

export default categoryRouter;
