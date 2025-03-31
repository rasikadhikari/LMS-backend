import mongoose, { Schema, model } from "mongoose";
import { Document } from "mongoose";
interface Isubmission extends Document {
  student: Schema.Types.ObjectId;
  assignment: Schema.Types.ObjectId;
  files?: string;
  answer?: string;
}

const submissionSchema = new Schema<Isubmission>({
  student: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  assignment: {
    type: Schema.ObjectId,
    ref: "Assignment",
    required: true,
  },
  files: [
    {
      type: String,
    },
  ],
  answer: {
    type: String,
  },
});
const submission = model("Submission", submissionSchema);

export const getSubmission = async () => {
  return await submission.find().populate("student", "name");
  // .populate("assignment", "question");
};

export const getSubmissionById = async (id: string) => {
  return await submission.findById(id);
};
export const createSubmission = async (data: {
  student: string;
  assignment: string;
  file: string[];
  answer: string;
}) => {
  return await submission.create(data);
};
export const updateSubmission = async (
  id: string,
  data: {
    student: string;
    assignment: string;
    file: string[];
    answer: string;
  }
) => {
  return await submission.findByIdAndUpdate(id, data);
};

export const deleteSubmission = async (id: string) => {
  return await submission.findByIdAndDelete(id);
};
