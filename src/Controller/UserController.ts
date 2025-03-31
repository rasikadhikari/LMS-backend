import { Response, Request } from "express";
import {
  findUser,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  findUserByEmail,
  updateUserPassword,
} from "../Model/User";
import Jwt from "jsonwebtoken";
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const data = await findUser();

    res.status(200).json({ message: "All users fetched", data });
  } catch (err) {
    handleError(res, err, "fetching all users");
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await findUserById(id);
    if (!data) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User fetched by ID", data });
  } catch (err) {
    handleError(res, err, "fetching user by ID");
  }
};

export const createNewUser = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      role,
      organization,
      enrolledCourses,
      address,
      contactNumber,
      createdBy,
    } = req.body;
    const user = await findUserByEmail(email);
    if (user) {
      throw new Error("User already exists");
    }
    const data = await createUser({
      name,
      email,
      password,
      role,
      organization,
      enrolledCourses,
      address,
      contactNumber,
      createdBy,
    });

    res.status(201).json({ message: "User created successfully", user: data });
  } catch (err) {
    handleError(res, err, "creating user");
  }
};
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    console.log(email, password);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = user.checkPassword(password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }
    const token = Jwt.sign({ id: user._id }, "secret", { expiresIn: "40h" });

    res.status(200).json({
      message: "User logged in successfully!",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      password,
      role,
      organization,
      enrolledCourses,
      address,
      contactNumber,
      createdBy,
    } = req.body;

    const data = await updateUser(id, {
      name,
      email,
      password,
      role,
      organization,
      enrolledCourses,
      address,
      contactNumber,
      createdBy,
    });

    if (!data) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User updated successfully", data });
  } catch (err) {
    handleError(res, err, "updating user");
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = await deleteUser(id);
    if (!data) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User deleted successfully", data });
  } catch (err) {
    handleError(res, err, "deleting user");
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const data = await findUserByEmail(email);

    if (!data) {
      res.status(404).json({ message: "User not found with this email" });
      return;
    }

    res.status(200).json({ message: "User fetched by email", data });
  } catch (err) {
    handleError(res, err, "fetching user by email");
  }
};

export const changeUserPassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const data = await updateUserPassword(id, { password });

    if (!data) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "User password updated successfully", data });
  } catch (err) {
    handleError(res, err, "updating user password");
  }
};

const handleError = (res: Response, err: unknown, action: string) => {
  if (err instanceof Error) {
    res.status(500).json({ message: `Error ${action}: ${err.message}` });
  } else {
    res
      .status(500)
      .json({ message: `An unknown error occurred while ${action}` });
  }
};
