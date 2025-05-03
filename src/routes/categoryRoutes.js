import express from 'express';
import verifyRole from '../middleware/AdminRole';

// import {} from '../controllers/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.get('/all');
categoryRouter.post('/create');
categoryRouter.put('/update/:id');
categoryRouter.delete('/delete/:id');

export default categoryRouter;
