import { body } from "express-validator";
import mongoose from "mongoose";

const isValidObjectId = (value: string) =>
  mongoose.Types.ObjectId.isValid(value);

export const createUserValidation = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .notEmpty()
    .withMessage("Email is required"),

  body("password")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .notEmpty()
    .withMessage("Password is required"),

  body("role")
    .isIn(["Admin", "Student", "Organization"])
    .withMessage("Role must be one of: Admin, Student, Organization"),

  body("organization")
    .optional()
    .custom((value) => {
      if (value && !isValidObjectId(value)) {
        throw new Error("Invalid organization ID format");
      }
      return true;
    }),

  body("enrolledCourses")
    .optional()
    .isArray()
    .withMessage("Enrolled courses must be an array")
    .custom((value) => {
      if (value && !value.every((id: string) => isValidObjectId(id))) {
        throw new Error("Each enrolled course must be a valid ObjectId");
      }
      return true;
    }),

  body("address").optional().isString().withMessage("Address must be a string"),

  body("contactNumber")
    .optional()
    .isString()
    .withMessage("Contact number must be a string")
    .matches(/^[0-9+()-\s]+$/)
    .withMessage("Invalid contact number format"),

  body("createdBy")
    .optional()
    .custom((value) => {
      if (value && !isValidObjectId(value)) {
        throw new Error("Invalid createdBy ID format");
      }
      return true;
    }),
];

export const updateUserValidation = [
  body("name").optional().isString().withMessage("Name must be a string"),

  body("email").optional().isEmail().withMessage("Invalid email format"),

  body("password")
    .optional()
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("role")
    .optional()
    .isIn(["Admin", "Student", "Organization"])
    .withMessage("Role must be one of: Admin, Student, Organization"),

  body("organization")
    .optional()
    .custom((value) => {
      if (value && !isValidObjectId(value)) {
        throw new Error("Invalid organization ID format");
      }
      return true;
    }),

  body("enrolledCourses")
    .optional()
    .isArray()
    .withMessage("Enrolled courses must be an array")
    .custom((value) => {
      if (value && !value.every((id: string) => isValidObjectId(id))) {
        throw new Error("Each enrolled course must be a valid ObjectId");
      }
      return true;
    }),

  body("address").optional().isString().withMessage("Address must be a string"),

  body("contactNumber")
    .optional()
    .isString()
    .withMessage("Contact number must be a string")
    .matches(/^[0-9+()-\s]+$/)
    .withMessage("Invalid contact number format"),

  body("createdBy")
    .optional()
    .custom((value) => {
      if (value && !isValidObjectId(value)) {
        throw new Error("Invalid createdBy ID format");
      }
      return true;
    }),
];
