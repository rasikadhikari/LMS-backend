import { Router } from "express";
import {
  getAllAssignments,
  getAssignmentById,
  createNewAssignment,
  updateAssignmentById,
  deleteAssignmentById,
} from "../Controller/AssignmentController";

const assignment = Router();

assignment.get("/", getAllAssignments);

assignment.get("/:id", getAssignmentById);

assignment.post("/", createNewAssignment);

assignment.put("/:id", updateAssignmentById);

assignment.delete("/:id", deleteAssignmentById);

export default assignment;
