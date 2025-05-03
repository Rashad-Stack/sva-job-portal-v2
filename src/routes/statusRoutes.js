import express from 'express';
import verifyRole from '../middleware/AdminRole';

// import {} from '../controllers/statusController.js';

const statusRouter = express.Router();

statusRouter.get('/all');
statusRouter.post('/create');
statusRouter.put('/update/:id');
statusRouter.delete('/delete/:id');

export default statusRouter;
