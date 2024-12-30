import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import './styles/Pages.css';
import ErrorBoundary from './components/ErrorBoundary.js';

// Import pages
import Portfolio from './pages/Portfolio.js';
import Services from './pages/Services.js';
import About from './pages/About.js';
import Contact from './pages/Contact.js';

function App() {
  const [activeSection, setActiveSection] = useState(0);
  const sections = [
    {
      title: "Creative Solutions",
      subtitle: "Innovative designs for modern challenges",
      image: "https://source.unsplash.com/random/1920x1080/?architecture,modern"
    },
    {
      title: "Sustainable Design",
      subtitle: "Eco-friendly approaches for a better future",
      image: "https://source.unsplash.com/random/1920x1080/?sustainable,architecture"
    },
    {
      title: "Urban Innovation",
      subtitle: "Reshaping cities for tomorrow",
      image: "https://source.unsplash.com/random/1920x1080/?urban,design"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % sections.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [sections.length]);

  const HomePage = () => (
    <div className="home-page">
      <main>
        {sections.map((section, index) => (
          <section 
            key={index} 
            className={`hero-section ${index === activeSection ? 'active' : ''}`}
            style={{ backgroundImage: `url(${section.image})` }}
          >
            <div className="content">
              <h1>{section.title}</h1>
              <p>{section.subtitle}</p>
              <button className="cta-button">Book Now</button>
            </div>
          </section>
        ))}
        <div className="scroll-indicator">
          {sections.map((_, index) => (
            <div 
              key={index} 
              className={`dot ${index === activeSection ? 'active' : ''}`}
              onClick={() => setActiveSection(index)}
            />
          ))}
        </div>
      </main>
    </div>
  );

  return (
    <Router>
      <div className="App">
        <nav>
          <div className="logo">STUDIO</div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact" className="contact-btn">Contact</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={
            <ErrorBoundary>
              <Portfolio />
            </ErrorBoundary>
          } />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
