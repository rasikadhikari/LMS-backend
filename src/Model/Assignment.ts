import mongoose, { Schema, model } from "mongoose";
import enrollment from "../Routes/EnrollmentRoutes";
import lesson from "../Routes/LessonRoutes";

const assignmentSchema = new Schema({
  course: {
    type: Schema.ObjectId,
    ref: "Course",
    required: true,
  },
  lesson: {
    type: Schema.ObjectId,
    ref: "Lesson",
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
});

const assignment = model("Assignment", assignmentSchema);

export const findAssignments = async () => {
  return await assignment
    .find()
    .populate("course", "courseName")
    .populate("lesson", "title");
};

export const findAssignmentById = async (id: string) => {
  return await assignment
    .findById(id)
    .populate("course", "courseName")
    .populate("lesson", "title");
};

export const createAssignment = async (data: {
  course: string;
  lesson: string;
  question: string;
}) => {
  return await assignment.create(data);
};

export const updateAssignment = async (
  id: string,
  data: {
    course: string;
    lesson: string;
    question: string;
  }
) => {
  return await assignment.findByIdAndUpdate(id, data);
};

export const deleteAssignment = async (id: string) => {
  return await assignment.findByIdAndDelete(id);
};
