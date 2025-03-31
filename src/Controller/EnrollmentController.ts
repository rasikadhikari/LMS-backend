import { Response, Request } from "express";
import {
  createEnrollment,
  deleteEnrollment,
  findEnrollment,
  findEnrollmentById,
  findEnrollmentByStudent,
  findOne,
  updateEnrollment,
} from "../Model/Enrollment";

// Get all enrollments
export const getAllEnrollments = async (req: Request, res: Response) => {
  try {
    const data = await findEnrollment();
    res.status(200).json({ message: "All enrollments shown", data });
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Get enrollment by ID
export const getEnrollmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await findEnrollmentById(id);
    res.status(200).json({ message: "Enrollment details by ID", data });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Get enrollments by Student ID
export const getEnrollmentsByStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const enrollments = await findEnrollmentByStudent(studentId);

    if (!enrollments.length) {
      res
        .status(404)
        .json({ message: "No enrollments found for this student" });
      return;
    }

    res.json(enrollments);
  } catch (err) {
    res.status(500).json({
      message: err instanceof Error ? err.message : "An error occurred",
    });
  }
};

// Create new enrollment or update if already enrolled
export const createNewEnrollment = async (req: Request, res: Response) => {
  try {
    const { student, course, progress, lessonCompleted, status } = req.body;

    // Check if student is already enrolled in the course
    const existingEnrollment = await findOne({ student, course });
    console.log("enrollment-------", existingEnrollment);

    if (existingEnrollment) {
      // If the student is already enrolled, just return the existing enrollment
      res.status(400).json({
        message: "Student is already enrolled in this course",
        data: existingEnrollment,
      });
      return;
    }

    // Otherwise, create a new enrollment
    const data = await createEnrollment({
      student,
      course,
      progress: progress || 0,
      lessonCompleted: lessonCompleted || 0,
      status: "enrolled", // Mark as "enrolled" on payment success
    });
    console.log(data);
    res.status(201).json({ message: "Enrollment created successfully", data });
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

// Update enrollment
export const updateEnrollmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { student, course, progress, lessonCompleted, status } = req.body;
    const data = await updateEnrollment(id, {
      student,
      course,
      progress,
      lessonCompleted,
      status,
    });
    if (!data) {
      res.status(404).json({ message: "Enrollment not found" });
      return;
    }
    res.status(200).json({ message: "Enrollment updated successfully", data });
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

// Delete enrollment
export const deleteEnrollmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await deleteEnrollment(id);
    res.status(200).json({ message: "Enrollment deleted successfully", data });
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
