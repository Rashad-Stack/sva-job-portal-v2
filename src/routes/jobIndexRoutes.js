import express from 'express';
import {
  createJobIndex,
  deleteJobIndex,
  fetchJobIndex,
  showJobIndexById,
  updateJobIndex,
} from '../controllers/jobIndexController.js';

const jobIndexRouter = express.Router();

jobIndexRouter.post('/create', createJobIndex);
jobIndexRouter.get('/all', fetchJobIndex);
jobIndexRouter.get('/:id', showJobIndexById);
jobIndexRouter.put('/update/:id', updateJobIndex);
jobIndexRouter.delete('/delete/:id', deleteJobIndex);

export default jobIndexRouter;
