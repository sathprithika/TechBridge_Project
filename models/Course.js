import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  knowledgeLevel: { type: String, required: true },
  goal: { type: String, required: true },
  experience: { type: String, required: true },
  link: { type: String, required: true },
}, { 
  timestamps: true, 
  collection: "courses" // Ensures it maps to the "courses" collection
});

const Course = mongoose.model("Course", CourseSchema);

export default Course;



