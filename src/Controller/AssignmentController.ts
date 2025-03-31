import { Request, Response } from "express";
import {
  findAssignments,
  findAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} from "../Model/Assignment";

// Get all assignments
export const getAllAssignments = async (req: Request, res: Response) => {
  try {
    const assignments = await findAssignments();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch assignments", error });
  }
};

// Get assignment by ID
export const getAssignmentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const assignment = await findAssignmentById(id);
    if (!assignment) {
      res.status(404).json({ message: "Assignment not found" });
      return;
    }
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch assignment", error });
  }
};

// Create new assignment
export const createNewAssignment = async (req: Request, res: Response) => {
  const { course, lesson, question } = req.body;
  try {
    const newAssignment = await createAssignment({ course, lesson, question });
    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(500).json({ message: "Failed to create assignment", error });
  }
};

// Update assignment by ID
export const updateAssignmentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { course, lesson, question } = req.body;
  try {
    const updatedAssignment = await updateAssignment(id, {
      course,
      lesson,
      question,
    });
    if (!updatedAssignment) {
      res.status(404).json({ message: "Assignment not found" });
      return;
    }
    res.status(200).json(updatedAssignment);
  } catch (error) {
    res.status(500).json({ message: "Failed to update assignment", error });
  }
};

// Delete assignment by ID
export const deleteAssignmentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedAssignment = await deleteAssignment(id);
    if (!deletedAssignment) {
      res.status(404).json({ message: "Assignment not found" });
      return;
    }
    res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete assignment", error });
  }
};
