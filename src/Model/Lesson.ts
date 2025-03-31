import mongoose, { Schema, model } from "mongoose";
interface IResource {
  type: "pdf" | "video";
  url: string;
}
interface ILesson extends Document {
  title: string;
  content: string | "";
  resourceMaterial: IResource[];
  courseId: mongoose.Types.ObjectId;
}
const lesson = new Schema<ILesson>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  resourceMaterial: [
    {
      type: { type: String, enum: ["pdf", "video"], required: true },
      url: { type: String, required: true },
    },
  ],
});

const Lesson = model<ILesson>("Lesson", lesson);
export const findlesson = async () => {
  return await Lesson.find().populate("courseId", "courseName");
};
export const findLessonById = async (id: string) => {
  return await Lesson.findById(id).populate("courseId", "courseName");
};
export const createLesson = async (data: {
  title: string;
  content: string;
  courseId: string;
  resourceMaterial: { type: "pdf" | "video"; url: string }[];
}) => {
  return await Lesson.create(data);
};
export const updateLesson = async (
  id: string,
  data: {
    title: string;
    content: string;
    courseId: string;
    resourceMaterial: { type: "pdf" | "video"; url: string }[];
  }
) => {
  return await Lesson.findByIdAndUpdate(id, data);
};
export const deleteLesson = async (id: string) => {
  return await Lesson.findByIdAndDelete(id);
};
