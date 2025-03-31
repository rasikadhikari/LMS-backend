import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import user from "./src/Routes/UserRoutes";
import course from "./src/Routes/CourseRoutes";
import enrollment from "./src/Routes/EnrollmentRoutes";
import lesson from "./src/Routes/LessonRoutes";
import assignment from "./src/Routes/AssignmentRoutes";
import submission from "./src/Routes/SubmissionRoutes";
import paypal from "./src/Routes/paypalRoutes";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", user);
app.use("/course", course);
app.use("/enroll", enrollment);
app.use("/lesson", lesson);
app.use("/assignment", assignment);
app.use("/submission", submission);
app.use("/api", paypal);

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/LMS")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server started at 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

export default app;
