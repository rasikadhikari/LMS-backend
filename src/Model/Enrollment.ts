import mongoose, { Schema, model } from "mongoose";
import { Document } from "mongoose";

interface IEnrollment extends Document {
  student: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  enrolledAt: Date;
  progress: number;
  lessonCompleted: string[];
  status: "enrolled" | "completed" | "cancelled";
}
const enrollment = new Schema<IEnrollment>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    status: {
      type: String,
      enum: ["enrolled", "completed", "cancelled"],
      default: "enrolled",
    },
    progress: {
      type: Number,
      required: true,
      default: 0,
    },
    lessonCompleted: [
      {
        type: Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
  },
  { timestamps: true }
);
const Enrollment = model<IEnrollment>("Enrollment", enrollment);
export const findEnrollment = async () => {
  return await Enrollment.find()
    .populate("student", "name email")
    .populate("course", "courseName");
};

export const findEnrollmentByStudent = async (studentId: string) => {
  return await Enrollment.find({ student: studentId })
    .populate("student", "name email")
    .populate("course", "courseName");
};
export const findEnrollmentById = async (id: string) => {
  return await Enrollment.findById(id)
    .populate("student", "name email")
    .populate("course", "courseName");
};
export const createEnrollment = async (data: {
  student: string;
  course: string;
  progress: number;
  status: string;
  lessonCompleted: string[];
}) => {
  return await Enrollment.create(data);
};
export const updateEnrollment = async (
  id: string,
  data: {
    student: string;
    course: string;
    progress: string;
    status: string;
    lessonCompleted: string[];
  }
) => {
  return await Enrollment.findByIdAndUpdate(id, data);
};
export const deleteEnrollment = async (id: string) => {
  return await Enrollment.findByIdAndDelete(id);
};

export const findOne = async (data: { student: string; course: string }) => {
  return await Enrollment.findOne(data);
};
