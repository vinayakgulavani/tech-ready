import React from "react";
import "../Styles/About.css";
import Layout from "../Components/Layout/Layout";

const About = () => {
  return (
    <Layout title={'About Techready'}>
      <div id="about" className="container m-3">
      <div id="about-header" className="text-center mb-4">
        <h1>About TechReady</h1>
        <p>Empowering Coders to Learn, Practice, and Excel</p>
      </div>

      {/* About Content */}
      <div id="about-content" className="row align-items-center">
        <div id="about-text" className="col-md-6">
          <h3>Our Mission</h3>
          <p>
            TechReady aims to bridge the gap between theory and practice by offering
            an interactive and engaging platform for coding enthusiasts. Our mission
            is to empower learners with the skills they need to excel in their coding
            journey through comprehensive notes, challenging coding games, mock tests,
            and certification courses.
          </p>
          <h3>Why Choose Us?</h3>
          <ul id="about-features">
            <li>💡 Interactive Learning with Real-World Projects</li>
            <li>🏆 Gamified Challenges and Competitions</li>
            <li>🎓 Certification Courses with Progress Tracking</li>
            <li>📈 AI-Powered Personalized Learning Paths</li>
            <li>💬 Community Collaboration and Group Chat</li>
          </ul>
        </div>

        {/* About Image */}
        <div id="about-image" className="col-md-6 text-center">
          <img
            src="/images/about.jpeg" alt="About TechReady"
            className="img-fluid rounded"
          />
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default About;
