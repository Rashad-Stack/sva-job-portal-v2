import express from 'express';
import verifyRole from '../middleware/AdminRole.js';
import {
  createJob,
  deleteJob,
  fetchJobs,
  showJob,
  updateJob,
} from '../controllers/jobController.js';

const jobRouter = express.Router();

// Public: Get all jobs
jobRouter.get('/all', fetchJobs); // GET /jobs

// Public: Get a single job by ID
jobRouter.get('/:id', showJob); // GET /jobs/:id

// Admin/Moderator: Create a new job
jobRouter.post('/create', verifyRole('ADMIN', 'MODERATOR'), createJob); // POST /jobs

// Admin/Moderator: Update job
jobRouter.put('/update/:id', verifyRole('ADMIN', 'MODERATOR'), updateJob); // PUT /jobs/:id

// Admin/Moderator: Delete job
jobRouter.delete('/delete/:id', verifyRole('ADMIN', 'MODERATOR'), deleteJob); // DELETE /jobs/:id

export default jobRouter;
