import express from 'express';
import { createJobIndex } from '../controllers/jobIndexController';

const jobIndexRouter = express.Router();

jobIndexRouter.get('/all');
jobIndexRouter.get('/:id');
jobIndexRouter.post('/create', createJobIndex);
jobIndexRouter.put('/update/:id');
jobIndexRouter.delete('/delete/:id');

export default jobRouter;
