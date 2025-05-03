import express from 'express';
import {
  createJob,
  deleteJob,
  fetchJobs,
  showJob,
  updateJob,
} from '../controllers/jobController.js';

const jobRouter = express.Router();

jobRouter.get('/all', fetchJobs);
jobRouter.get('/:id', showJob);
jobRouter.post('/create', createJob);
jobRouter.put('/update/:id', updateJob);
jobRouter.delete('/delete/:id', deleteJob);

export default jobRouter;
