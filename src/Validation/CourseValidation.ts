import { body } from "express-validator";
import mongoose from "mongoose";

export const courseValidation = [
  body("courseName").isString().withMessage("Course should be string"),
  body("courseId").isString().withMessage("Course should be string"),
  body("description").isString().withMessage("Course should be string"),
  body("organization")
    .isString()
    .withMessage("Organization must be a string")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid organization ID format");
      }
      return true;
    }),
  body("price").optional().isString().withMessage("Price should be number"),
];
