import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <section className="hero-section">
        <h1>The Future Is Already Here</h1>
        <p className="hero-text">We're not just predicting tomorrow. We're building it.</p>
      </section>

      <section className="feature-section">
        <div className="feature-content">
          <h2>Pioneering Tomorrow</h2>
          <p>By understanding what comes next, we reshape the present. Our technology doesn't just 
             anticipate the future—it defines it.</p>
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-item">
          <span className="stat-number">2024</span>
          <span className="stat-label">Launch Year</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">∞</span>
          <span className="stat-label">Possibilities</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">1</span>
          <span className="stat-label">Mission</span>
        </div>
      </section>

      <section className="mission-section">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>To accelerate humanity's journey into an enlightened future through 
             breakthrough innovation and visionary thinking.</p>
        </div>
      </section>

      <section className="vision-section">
        <div className="vision-content left">
          <h3>Innovation</h3>
          <p>Pushing boundaries isn't just a goal—it's our starting point. Every day, 
             we challenge conventional wisdom to forge new paths forward.</p>
        </div>
        <div className="vision-content right">
          <h3>Impact</h3>
          <p>Our solutions don't just solve today's problems. They create tomorrow's 
             opportunities, driving progress at an unprecedented scale.</p>
        </div>
      </section>

      <section className="closing-section">
        <p className="closing-text">Join us in shaping what comes next.</p>
      </section>
    </div>
  );
};

export default About;
