import mongoose, { Schema, model } from "mongoose";
import { Document } from "mongoose";
interface ICourse extends Document {
  courseName: string;
  courseId: string;
  description: string;
  organization: mongoose.Types.ObjectId;
  Lecturer: String;
  price?: string;
}

const course = new Schema<ICourse>(
  {
    courseName: {
      type: String,
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: {
      type: String,
      required: false,
    },
    Lecturer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Course = model<ICourse>("Course", course);
export const findCourse = async () => {
  return await Course.find().populate("organization", "name").exec();
};
export const findCouseById = async (id: string) => {
  return await Course.findById(id).populate("organization", "name").exec();
};
export const createCourse = async (data: {
  courseName: string;
  courseId: string;
  description: string;
  organization: string;
  price: string;
  Lecturer: String;
}) => {
  return await Course.create(data);
};
export const updateCourse = async (
  id: string,
  data: {
    courseName: string;
    courseId: string;
    description: string;
    organization: string;
    price: string;
    Lecturer: String;
  }
) => {
  return await Course.findByIdAndUpdate(id, data);
};
export const deleteCourse = async (id: string) => {
  return await Course.findByIdAndDelete(id);
};
