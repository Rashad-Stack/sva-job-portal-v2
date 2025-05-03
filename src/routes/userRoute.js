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
userRouter.get('/', verifyRole('ADMIN'), fetchUsers); // GET /users
userRouter.post('/', verifyRole('ADMIN'), createUser); // POST /users
userRouter.get('/:id', verifyRole('ADMIN', 'MODERATOR'), showUser); // GET /users/:id
userRouter.put('/:id', verifyRole('ADMIN', 'MODERATOR'), updateUser); // PUT /users/:id
userRouter.delete('/:id', verifyRole('ADMIN'), deleteUser); // DELETE /users/:id

export default userRouter;
