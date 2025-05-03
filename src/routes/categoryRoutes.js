import express from 'express';
import verifyRole from '../middleware/AdminRole';
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from '../controllers/CategoryController.js';

const categoryRouter = express.Router();

// Public: Get all categories
categoryRouter.get('/all', fetchCategories);

// Admin/Moderator: Create category
categoryRouter.post('/create', verifyRole('ADMIN', 'MODERATOR'), createCategory);

// Admin/Moderator: Update category
categoryRouter.put('/update', verifyRole('ADMIN', 'MODERATOR'), updateCategory);

// Admin/Moderator: Delete category
categoryRouter.delete('/delete/:id', verifyRole('ADMIN', 'MODERATOR'), deleteCategory);

export default categoryRouter;
