import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    {
      image: 'https://source.unsplash.com/random/1920x1080/?photography,studio',
      title: 'CAPTURE MOMENTS',
      subtitle: 'Professional Photography Studio'
    },
    {
      image: 'https://source.unsplash.com/random/1920x1080/?portrait',
      title: 'PORTRAITS',
      subtitle: 'Timeless Elegance'
    },
    {
      image: 'https://source.unsplash.com/random/1920x1080/?wedding',
      title: 'EVENTS',
      subtitle: 'Memorable Occasions'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % sections.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <nav>
        <div className="logo">STUDIO</div>
        <div className="nav-links">
          <a href="#portfolio">Portfolio</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact" className="contact-btn">Contact</a>
        </div>
      </nav>

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

      <section className="portfolio-preview">
        <div className="grid">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="grid-item">
              <img 
                src={`https://source.unsplash.com/random/600x600/?photography,${item}`} 
                alt={`Portfolio ${item}`}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
