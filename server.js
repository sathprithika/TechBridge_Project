import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import OpenAI from "openai";
import Course from "./models/Course.js"; 
import Quiz from "./models/Quiz.js";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// Enable CORS & JSON parsing
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Initialize OpenAI API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// 📌 Chatbot Socket Connection
io.on("connection", (socket) => {
    console.log("⚡ User connected:", socket.id);

    socket.on("user_message", async (message) => {
        console.log("📩 Received message:", message);

        try {
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }],
            });

            const botReply = response.choices[0].message.content;
            console.log("🤖 Bot Reply:", botReply);

            socket.emit("ai_response", botReply);
        } catch (error) {
            console.error("❌ OpenAI Error:", error.message);
            socket.emit("ai_response", "Sorry, I encountered an issue.");
        }
    });

    socket.on("disconnect", () => {
        console.log("⚠ User disconnected:", socket.id);
    });
});

// 📌 POST a new course
app.post("/courses", async (req, res) => {
    try {
        const { title, description, knowledgeLevel, goal, experience, link } = req.body;
        if (!title || !description || !knowledgeLevel || !goal || !experience || !link) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newCourse = new Course({ title, description, knowledgeLevel, goal, experience, link });
        await newCourse.save();

        res.status(201).json({ message: "✅ Course added successfully!", course: newCourse });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

// 📌 GET all courses
app.get("/courses", async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

// 📌 Search courses with flexible filtering
app.get("/courses/search", async (req, res) => {
    try {
        const { knowledgeLevel, goal, experience } = req.query;

        if (!knowledgeLevel || !goal || !experience) {
            return res.status(400).json({ message: "Missing required parameters" });
        }

        const courses = await Course.find({
            knowledgeLevel: { $regex: new RegExp(knowledgeLevel, "i") },
            goal: { $regex: new RegExp(goal, "i") },
            experience: { $regex: new RegExp(experience, "i") },
        });

        if (courses.length === 0) {
            return res.status(404).json({ message: "No courses found." });
        }

        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", details: error.message });
    }
});

// 📌 Add a new quiz
app.post("/quizzes", async (req, res) => {
    try {
        const { courseId, title, questions } = req.body;
        if (!courseId || !title || !questions || questions.length === 0) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const courseExists = await Course.findById(courseId);
        if (!courseExists) {
            return res.status(404).json({ error: "Course not found" });
        }

        const newQuiz = new Quiz({ courseId, title, questions });
        await newQuiz.save();

        res.status(201).json({ message: "✅ Quiz added successfully!", quiz: newQuiz });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

// 📌 Get all quizzes
app.get("/quizzes", async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate("courseId", "title");
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

// 📌 Get quiz by course ID
app.get("/quizzes/:courseId", async (req, res) => {
    try {
        const { courseId } = req.params;
        const quiz = await Quiz.findOne({ courseId }).populate("courseId", "title");

        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found for this course" });
        }

        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

// 📌 Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));