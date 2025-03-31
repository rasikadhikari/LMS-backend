import { body } from "express-validator";
import mongoose from "mongoose";

export const lessonValidation = [
  body("title").isString().withMessage("Title must be a string"),
  body("content").isString().withMessage("Content must be a string"),

  body("courseId")
    .isString()
    .withMessage("Course ID must be a string")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid course ID format");
      }
      return true;
    }),

  body("resourceMaterial")
    .isArray({ min: 1 })
    .withMessage("Resource material must be a non-empty array"),

  body("resourceMaterial.*.type")
    .isIn(["pdf", "youtube"])
    .withMessage(
      "Each resource material must have a valid type ('pdf' or 'youtube')"
    ),

  body("resourceMaterial.*.url")
    .isString()
    .withMessage("Each resource material must have a URL"),
];
