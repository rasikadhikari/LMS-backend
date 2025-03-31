import express from "express";
import multer from "multer";
import { createLesson } from "../Model/Lesson";

const router = express.Router();

// Configure Multer for file upload (store in /uploads folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Route for creating a lesson (with file upload from desktop)
router.post("/lessons", upload.single("resourceMaterial"), async (req, res) => {
  const { title, content, courseId } = req.body;

  const fileUrl = `/uploads/${req.file?.filename}`; // Save the file path

  const lessonData = {
    title,
    content,
    courseId,
    resourceMaterial: [{ type: "pdf" as "pdf", url: fileUrl }],
  };

  const newLesson = await createLesson(lessonData);
  res.status(201).json(newLesson);
});

export default router;
