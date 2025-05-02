import prisma from '../DB/db.config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const fetchUsers = async (req, res) => {
  try {
    const User = await prisma.User.findMany({});

    return res.status(200).json({ success: true, data: User });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const findUser = await prisma.User.findUnique({
    where: {
      email,
    },
  });

  if (findUser) {
    return res.json({
      status: 400,
      message: 'Email Already Taken. Please use another email.',
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await prisma.User.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  // Remove password before sending response
  const { password: _, ...userWithoutPassword } = newUser;

  return res.json({
    status: 200,
    data: userWithoutPassword,
    msg: ' created.',
  });
};

// * Show user
export const showUser = async (req, res) => {
  const UserId = req.params.id;
  const User = await prisma.User.findFirst({
    where: {
      id: Number(UserId),
    },
  });

  return res.json({ status: 200, data: User });
};

// * Update the user
export const updateUser = async (req, res) => {
  const UserId = req.params.id;
  const { name, email, password, role } = req.body;

  await prisma.User.update({
    where: {
      id: Number(UserId),
    },
    data: {
      name,
      email,
      password,
      role,
    },
  });

  return res.status(200).json({ success: true, message: 'User updated successfully' });
};

// * Delete user
export const deleteUser = async (req, res) => {
  const UserId = req.params.id;
  await prisma.User.delete({
    where: {
      id: Number(UserId),
    },
  });

  return res.status(200).json({ success: true, msg: 'User deleted successfully' });
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const User = await prisma.User.findUnique({
      where: { email },
    });

    if (!User) {
      return res.status(400).json({
        message: 'User not found, invalid credentials.',
      });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password, please try again.' });
    }

    // ✅ Corrected variable name
    const token = jwt.sign(
      {
        id: User.id,
        name: User.name,
        email: User.email,
        role: User.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    );

    // ✅ Set the token in cookies
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 72 * 60 * 60 * 1000, // 72 hours
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: User.id,
        name: User.name,
        email: User.email,
        role: User.role,
      },
    });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};

export const logoutUser = (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'strict',
    });

    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    console.error('Error during logout:', err);
    res.status(500).json({ message: 'Error logging out', error: err.message });
  }
};
