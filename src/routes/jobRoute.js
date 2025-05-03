import express from 'express';
import verifyRole from '../middleware/AdminRole.js';
import {
  createJob,
  deleteJob,
  fetchJob,
  showJob,
  updateJob,
} from '../controllers/jobController.js';

const jobRoute = express.Router();

// Public route to fetch all jobs (no auth)
jobRoute.get('/all', fetchJob);

// Admin-only route to create a job
jobRoute.post('/create', verifyRole('ADMIN', 'MODARATOR'), createJob);

// Public route to view a job by ID
jobRoute.get('/:id', showJob);

// Admin-only route to update a job
jobRoute.put('/update/:id', verifyRole('ADMIN', 'MODARATOR'), updateJob);

// Admin-only route to delete a job
jobRoute.delete('/delete/:id', verifyRole('ADMIN', 'MODARATOR'), deleteJob);

export default jobRoute;
