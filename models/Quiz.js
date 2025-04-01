import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
});

const QuizSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    questions: [QuestionSchema],
  },
  { 
    timestamps: true, 
    collection: "quizzes" // Ensures it maps to the "quizzes" collection
  }
);

const Quiz = mongoose.model("Quiz", QuizSchema);

export default Quiz;
