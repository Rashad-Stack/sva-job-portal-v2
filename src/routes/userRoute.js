import express from 'express';
import verifyRole from '../middleware/AdminRole.js';
import {
  createUser,
  deleteUser,
  fetchUser,
  LoginUser,
  logoutUser,
  showUser,
  updateUser,
} from '../controllers/userController.js';

const User = express.Router();

User.get('/all', verifyRole('ADMIN'), fetchUser);
User.post('/create', verifyRole('ADMIN'), createUser);
User.get('/:id', verifyRole('ADMIN', 'MODARATOR'), showUser);
User.put('/update/:id', verifyRole('ADMIN', 'MODARATOR'), updateUser);
User.delete('/delete/:id', verifyRole('ADMIN'), deleteUser);
User.post('/login', LoginUser);
User.post('/logout', logoutUser);

export default User;
