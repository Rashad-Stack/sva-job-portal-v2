import express from 'express';
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from '../controllers/CategoryController.js';

const categoryRouter = express.Router();

categoryRouter.get('/all', fetchCategories);
categoryRouter.post('/create', createCategory);
categoryRouter.put('/update', updateCategory);
categoryRouter.delete('/delete/:id', deleteCategory);

export default categoryRouter;
