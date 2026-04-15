import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [file, setFile] = useState(null);
  const [score, setScore] = useState("82%");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light");

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please select your resume first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );

      const response = await axios.post(
        "http://localhost:5000/api/analyze"
      );

      setScore(response.data.score);
      alert("Resume uploaded and analyzed successfully ✅");
    } catch (error) {
      console.log(error);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="content-card">
            <h2>📄 Upload Resume</h2>

            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />

            {file && (
              <p style={{ marginTop: "10px" }}>
                Selected File: {file.name}
              </p>
            )}

            <button
              style={{ marginTop: "15px" }}
              onClick={handleAnalyze}
            >
              {loading ? "Uploading..." : "Analyze Resume"}
            </button>

            <div className="score-box">
              <h1>{score}</h1>
              <p>Recruiter Approved Resume</p>
            </div>
          </div>
        );

      case "analytics":
        return (
          <div className="content-card">
            <h2>📈 Resume Analytics</h2>

            <div className="analytics-grid">
              <div className="mini-card">
                <h3>Skills Score</h3>
                <h1>90%</h1>
              </div>

              <div className="mini-card">
                <h3>Projects Score</h3>
                <h1>88%</h1>
              </div>

              <div className="mini-card">
                <h3>Experience Score</h3>
                <h1>75%</h1>
              </div>

              <div className="mini-card">
                <h3>ATS Compatibility</h3>
                <h1>92%</h1>
              </div>
            </div>
          </div>
        );

      case "jobmatch":
        return (
          <div className="content-card">
            <h2>💼 Job Match</h2>

            <div className="mini-card">
              <h3>MERN Stack Developer</h3>
              <p>95% Match</p>
            </div>

            <div className="mini-card">
              <h3>Full Stack Developer</h3>
              <p>90% Match</p>
            </div>

            <div className="mini-card">
              <h3>Software Developer</h3>
              <p>85% Match</p>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="content-card">
            <h2>⚙️ Settings</h2>

            <button
              onClick={() =>
                setTheme(theme === "light" ? "dark" : "light")
              }
            >
              Switch to {theme === "light" ? "Dark" : "Light"} Mode
            </button>

            <p style={{ marginTop: "20px" }}>
              Current Theme: {theme}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`dashboard ${theme}`}>
      <div className="header">
        <h1>AI RESUME SCORING</h1>
        <p style={{ marginTop: "8px", fontSize: "14px" }}>
          Welcome, Abhishek 👋 | Resume Analyzer Active
        </p>
      </div>

      <div className="nav">
        <span
          className={activeTab === "dashboard" ? "active" : ""}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </span>

        <span
          className={activeTab === "analytics" ? "active" : ""}
          onClick={() => setActiveTab("analytics")}
        >
          Analytics
        </span>

        <span
          className={activeTab === "jobmatch" ? "active" : ""}
          onClick={() => setActiveTab("jobmatch")}
        >
          Job Match
        </span>

        <span
          className={activeTab === "settings" ? "active" : ""}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </span>
      </div>

      {renderContent()}

      <footer
        style={{
          marginTop: "30px",
          textAlign: "center",
          fontSize: "14px",
        }}
      >
        © 2026 CareerSync | AI Resume Scoring Dashboard
      </footer>
    </div>
  );
}

export default App;