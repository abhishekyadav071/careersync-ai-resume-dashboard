const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema({
  fileName: String,
  score: String,
  role: String,
  missingSkills: [String],
});

module.exports = mongoose.model("Analysis", analysisSchema);