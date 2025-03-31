import express from "express";
import {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById,
  getUserByEmail,
  changeUserPassword,
  loginUser,
} from "../Controller/UserController";
import {
  createUserValidation,
  updateUserValidation,
} from "../Validation/UserValidation";

const user = express();

user.use(express.json());
user.use(express.urlencoded({ extended: true }));

user.get("/", getAllUsers);
user.get("/:id", getUserById);

user.put("/:id", updateUserValidation, updateUserById);
user.delete("/:id", deleteUserById);

user.get("/:email", getUserByEmail);
user.patch("/password/:id", changeUserPassword);
// to login
user.post("/signup", createUserValidation, createNewUser);
user.post("/login", loginUser);

export default user;
