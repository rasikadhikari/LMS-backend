import express from "express";
import {
  getAllLessons,
  getLessonById,
  createNewLesson,
  updateLessonById,
  deleteLessonById,
} from "../Controller/LessonController";
import { lessonValidation } from "../Validation/LessonValidation";
import { auth } from "../Utils/auth";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

const lesson = express();
lesson.use(express.json());
lesson.use(express.urlencoded({ extended: true }));

lesson.get("/", getAllLessons);
lesson.get("/:id", getLessonById);
lesson.post(
  "/",
  auth,
  lessonValidation,
  upload.single("resourceMaterial"),
  createNewLesson
);
lesson.put("/:id", auth, lessonValidation, updateLessonById);
lesson.delete("/:id", deleteLessonById);

export default lesson;
