import prisma from "../DB/db.config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const fetchModarators = async (req, res) => {
  try {
    const modarator = await prisma.modarator.findMany({});

    return res.status(200).json({ success: true, data: modarator });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error" });
  }
};

export const createModarator = async (req, res) => {
  const { name, email, password, role } = req.body;

  const findModarator = await prisma.modarator.findUnique({
    where: {
      email,
    },
  });

  if (findModarator) {
    return res.json({
      status: 400,
      message: "Email Already Taken. Please use another email.",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newModarator = await prisma.modarator.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  // Remove password before sending response
  const { password: _, ...userWithoutPassword } = newModarator;

  return res.json({
    status: 200,
    data: userWithoutPassword,
    msg: " created.",
  });
};

// * Show user
export const showModarator = async (req, res) => {
  const modaratorId = req.params.id;
  const modarator = await prisma.modarator.findFirst({
    where: {
      id: Number(modaratorId),
    },
  });

  return res.json({ status: 200, data: modarator });
};

// * Update the user
export const updateModarator = async (req, res) => {
  const modaratorId = req.params.id;
  const { name, email, password, role } = req.body;

  await prisma.modarator.update({
    where: {
      id: Number(modaratorId),
    },
    data: {
      name,
      email,
      password,
      role,
    },
  });

  return res
    .status(200)
    .json({ success: true, message: "User updated successfully" });
};

// * Delete user
export const deleteModarator = async (req, res) => {
  const modaratorId = req.params.id;
  await prisma.modarator.delete({
    where: {
      id: Number(modaratorId),
    },
  });

  return res
    .status(200)
    .json({ success: true, msg: "User deleted successfully" });
};

export const LoginModarator = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const modarator = await prisma.modarator.findUnique({
      where: { email },
    });

    if (!modarator) {
      return res.status(400).json({
        message: "User not found, invalid credentials.",
      });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, modarator.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect password, please try again." });
    }

    // ✅ Corrected variable name
    const token = jwt.sign(
      {
        id: modarator.id,
        name: modarator.name,
        email: modarator.email,
        role: modarator.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // ✅ Set the token in cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 72 * 60 * 60 * 1000, // 72 hours
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: modarator.id,
        name: modarator.name,
        email: modarator.email,
        role: modarator.role,
      },
    });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

export const logoutModarator = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error("Error during logout:", err);
    res.status(500).json({ message: "Error logging out", error: err.message });
  }
};
