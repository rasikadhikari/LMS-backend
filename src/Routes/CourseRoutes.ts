import express from "express";
import {
  getAllCourse,
  getAllCourseById,
  getCreateCourse,
  getDeleteCourse,
  getUpdateCourse,
} from "../Controller/CourseController";
import { courseValidation } from "../Validation/CourseValidation";
import { auth } from "../Utils/auth";

const course = express();
course.use(express.json());
course.use(express.urlencoded({ extended: true }));

course.get("/", getAllCourse);
course.get("/:id", getAllCourseById);
course.post("/", auth, courseValidation, getCreateCourse);
course.put("/:id", auth, courseValidation, getUpdateCourse);
course.delete("/:id", getDeleteCourse);

export default course;
