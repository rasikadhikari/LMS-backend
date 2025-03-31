import { Request, Response } from "express";
import {
  getSubmission,
  getSubmissionById,
  createSubmission,
  updateSubmission,
  deleteSubmission,
} from "../Model/Submission";

// Get all submissions
export const getAllSubmissions = async (req: Request, res: Response) => {
  try {
    const submissions = await getSubmission();
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch submissions", error });
  }
};

// Get submission by ID
export const getSubmissionByIdController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const submission = await getSubmissionById(id);
    if (!submission) {
      res.status(404).json({ message: "Submission not found" });
      return;
    }
    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch submission", error });
  }
};

// Create new submission
export const createNewSubmission = async (req: Request, res: Response) => {
  const { student, assignment, files, answer } = req.body;
  try {
    const newSubmission = await createSubmission({
      student,
      assignment,
      file: files, // Notice this maps to `file` in your createSubmission function (might want to rename it in your model to `files`)
      answer,
    });
    res.status(201).json(newSubmission);
  } catch (error) {
    res.status(500).json({ message: "Failed to create submission", error });
  }
};

// Update submission by ID
export const updateSubmissionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { student, assignment, files, answer } = req.body;
  try {
    const updatedSubmission = await updateSubmission(id, {
      student,
      assignment,
      file: files, // Again, this might need renaming in your model
      answer,
    });
    if (!updatedSubmission) {
      res.status(404).json({ message: "Submission not found" });
      return;
    }
    res.status(200).json(updatedSubmission);
  } catch (error) {
    res.status(500).json({ message: "Failed to update submission", error });
  }
};

// Delete submission by ID
export const deleteSubmissionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedSubmission = await deleteSubmission(id);
    if (!deletedSubmission) {
      res.status(404).json({ message: "Submission not found" });
      return;
    }
    res.status(200).json({ message: "Submission deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete submission", error });
  }
};
