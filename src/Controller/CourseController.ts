import { Response, Request } from "express";
import {
  createCourse,
  deleteCourse,
  findCourse,
  findCouseById,
  updateCourse,
} from "../Model/Course";

export const getAllCourse = async (req: Request, res: Response) => {
  try {
    const data = await findCourse();
    res.status(200).json({ message: "All course shown", data });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
export const getAllCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await findCouseById(id);
    res.status(200).json({ message: "All course by their", data });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error in Id" });
    }
  }
};
export const getCreateCourse = async (req: Request, res: Response) => {
  try {
    const { courseName, courseId, description, organization, price, Lecturer } =
      req.body;
    const data = await createCourse({
      courseName,
      courseId,
      description,
      organization,
      price,
      Lecturer,
    });
    res.status(200).json({ message: "All course by their", data });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error while creating" });
    }
  }
};
export const getUpdateCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { courseName, courseId, description, organization, price, Lecturer } =
      req.body;
    const data = await updateCourse(id, {
      courseName,
      courseId,
      description,
      organization,
      price,
      Lecturer,
    });
    res.status(200).json({ message: "All course by their", data });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
      console.log(err);
    } else {
      res.status(500).json({ message: "An unknown error while Updating" });
    }
  }
};
export const getDeleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = await deleteCourse(id);
    res.status(200).json({ message: "deleted", data });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error while deleting" });
    }
  }
};
