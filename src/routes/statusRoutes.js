import express from 'express';

const statusRouter = express.Router();

statusRouter.get('/all');
statusRouter.post('/create');
statusRouter.put('/update/:id');
statusRouter.delete('/delete/:id');

export default statusRouter;
