import express from 'express';
import {
  createStatus,
  deleteStatus,
  fetchStatuses,
  updateStatus,
} from '../controllers/statusController.js';

const statusRouter = express.Router();

statusRouter.get('/all', fetchStatuses);
statusRouter.post('/create', createStatus);
statusRouter.put('/update/:id', updateStatus);
statusRouter.delete('/delete/:id', deleteStatus);

export default statusRouter;
