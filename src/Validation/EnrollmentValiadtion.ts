import { body } from "express-validator";
import mongoose from "mongoose";

export const enrollmentValidation = [
  body("student")
    .isString()
    .withMessage("Student ID must be a string")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid student ID format");
      }
      return true;
    })
    .withMessage("Invalid student ID"),

  body("course")
    .isString()
    .withMessage("Course ID must be a string")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid course ID format");
      }
      return true;
    })
    .withMessage("Invalid course ID"),

  body("status")
    .isString()
    .withMessage("Status must be a string")
    .isIn(["enrolled", "completed", "cancelled"])
    .withMessage("Status must be one of: enrolled, completed, cancelled"),
];
