import express from "express";
import {
  getAllEnrollments,
  getEnrollmentById,
  createNewEnrollment,
  updateEnrollmentById,
  deleteEnrollmentById,
  getEnrollmentsByStudent,
} from "../Controller/EnrollmentController";
import { enrollmentValidation } from "../Validation/EnrollmentValiadtion";
import { auth } from "../Utils/auth";

const enrollment = express.Router(); 

enrollment.use(express.json());
enrollment.use(express.urlencoded({ extended: true }));

enrollment.get("/", getAllEnrollments);
enrollment.get("/:id", getEnrollmentById);
enrollment.get("/enroll/:studentId", auth, getEnrollmentsByStudent);
enrollment.post("/", auth, enrollmentValidation, createNewEnrollment);
enrollment.put("/:id", auth, enrollmentValidation, updateEnrollmentById);
enrollment.delete("/:id", deleteEnrollmentById);

export default enrollment;
