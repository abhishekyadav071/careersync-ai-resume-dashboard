const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const Analysis = require("./models/Analysis");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/jobfitai")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());

// File upload storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Home route
app.get("/", (req, res) => {
  res.send("JobFit AI Backend Running 🚀");
});

// Upload route
app.post("/api/upload", upload.single("resume"), (req, res) => {
  res.json({
    success: true,
    message: "Resume uploaded successfully",
    fileName: req.file.filename,
  });
});

// Analyze route
app.post("/api/analyze", async (req, res) => {
  try {
    const resumeSkills = [
      "react",
      "node",
      "express",
      "mongodb",
      "javascript",
      "java",
      "python",
      "git",
      "postman",
      "jwt",
      "rest api"
    ];

    const score = 95;

    const result = {
      score: `${score}%`,
      role: "MERN Stack Developer",
      matchedSkills: resumeSkills,
      missingSkills: ["Docker", "AWS", "Redis"],
      summary:
        "Strong MERN Stack profile with full-stack project experience, REST API development, JWT authentication, and database handling.",
      recommendation:
        "Best suited for Web Developer, MERN Stack Developer, and Software Developer roles.",
    };

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Analyze failed",
    });
  }
});

// History route
app.get("/api/history", async (req, res) => {
  const history = await Analysis.find();
  res.json(history);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});