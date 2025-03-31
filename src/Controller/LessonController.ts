import { Response, Request } from "express";
import {
  findlesson,
  findLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
} from "../Model/Lesson";

export const getAllLessons = async (req: Request, res: Response) => {
  try {
    const data = await findlesson();
    res.status(200).json({ message: "All lessons shown", data });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const getLessonById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await findLessonById(id);
    res.status(200).json({ message: "Lesson details by ID", data });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const createNewLesson = async (req: Request, res: Response) => {
  try {
    const { title, content, courseId } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : "";
    const data = await createLesson({
      title,
      content,
      courseId,
      resourceMaterial: [{ type: "pdf", url: fileUrl }],
    });
    res.status(201).json({ message: "Lesson created successfully", data });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res
        .status(500)
        .json({ message: "An unknown error occurred while creating" });
    }
  }
};

export const updateLessonById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, courseId, resourceMaterial } = req.body;
    const data = await updateLesson(id, {
      title,
      content,
      courseId,
      resourceMaterial,
    });
    res.status(200).json({ message: "Lesson updated successfully", data });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res
        .status(500)
        .json({ message: "An unknown error occurred while updating" });
    }
  }
};

export const deleteLessonById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await deleteLesson(id);
    res.status(200).json({ message: "Lesson deleted successfully", data });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res
        .status(500)
        .json({ message: "An unknown error occurred while deleting" });
    }
  }
};
