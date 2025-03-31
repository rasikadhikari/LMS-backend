import { Router } from "express";
import {
  getAllSubmissions,
  getSubmissionByIdController,
  createNewSubmission,
  updateSubmissionById,
  deleteSubmissionById,
} from "../Controller/SubmissionController";

const submission = Router();

submission.get("/", getAllSubmissions);

submission.get("/:id", getSubmissionByIdController);

submission.post("/", createNewSubmission);

submission.put("/:id", updateSubmissionById);

submission.delete("/:id", deleteSubmissionById);

export default submission;
