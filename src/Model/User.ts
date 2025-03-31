import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export type UserRole = "Admin" | "Student" | "Organization";

interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  organization?: mongoose.Types.ObjectId;
  enrolledCourses?: mongoose.Types.ObjectId[] | [];
  address?: string;
  contactNumber?: string;
  createdBy?: mongoose.Types.ObjectId;
}

interface IUserMethods {
  checkPassword: (password: string) => boolean;
}

type UserModel = mongoose.Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["Admin", "Student", "Organization"],
    required: true,
  },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  address: { type: String },
  contactNumber: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 8);
  next();
});

userSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compareSync(password.trim(), this.password);
};

const User = model<IUser, UserModel>("User", userSchema);

export const findUser = async () => User.find();

export const findUserById = async (id: string) => User.findById(id);
export const createUser = async (data: Partial<IUser>) => User.create(data);
export const updateUser = async (id: string, data: Partial<IUser>) =>
  User.findByIdAndUpdate(id, data);
export const deleteUser = async (id: string) => User.findByIdAndDelete(id);
export const findUserByEmail = async (email: string) => User.findOne({ email });
export const updateUserPassword = async (
  id: string,
  data: { password: string }
) => User.findByIdAndUpdate(id, data);

export { User };
