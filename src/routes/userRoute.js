import express from 'express';
import verifyRole from '../middleware/AdminRole.js';
import {
  createUser,
  deleteUser,
  fetchUsers,
  loginUser,
  logoutUser,
  showUser,
  updateUser,
} from '../controllers/userController.js';

const userRouter = express.Router();

// Auth routes
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);

// User management
userRouter.get('/:id', showUser); // GET /users/:id
userRouter.put('/update/:id', updateUser); // PUT /users/:id
userRouter.get('/all', verifyRole('ADMIN'), fetchUsers); // GET /users
userRouter.post('/create', verifyRole('ADMIN'), createUser); // POST /users
userRouter.delete('/delete/:id', verifyRole('ADMIN'), deleteUser); // DELETE /users/:id

export default userRouter;
