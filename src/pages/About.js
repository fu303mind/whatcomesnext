import React from 'react';

const About = () => {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <div className="about-content">
        <div className="about-text">
          <h2>Our Story</h2>
          <p>Add your company story here...</p>
        </div>
        <div className="team-section">
          <h2>Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <h3>Team Member 1</h3>
              <p>Role / Position</p>
            </div>
            <div className="team-member">
              <h3>Team Member 2</h3>
              <p>Role / Position</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
