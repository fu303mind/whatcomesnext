import React, { useEffect, useRef } from 'react';
import './Services.css';

const Services = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-section').forEach((section) => {
      observerRef.current.observe(section);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="services-container">
      <section className="service-section videography">
        <div className="service-content">
          <h2>Videography</h2>
          <p>Cinematic storytelling that captures your vision</p>
          <div className="service-features">
            <div className="feature">
              <span className="feature-value">4K</span>
              <span className="feature-label">Resolution</span>
            </div>
            <div className="feature">
              <span className="feature-value">60fps</span>
              <span className="feature-label">Frame Rate</span>
            </div>
            <div className="feature">
              <span className="feature-value">HDR</span>
              <span className="feature-label">Color Range</span>
            </div>
          </div>
          <button className="service-cta">Learn More</button>
        </div>
      </section>

      <section className="service-section photography">
        <div className="service-content">
          <h2>Photography</h2>
          <p>Capturing moments with unparalleled precision</p>
          <div className="service-features">
            <div className="feature">
              <span className="feature-value">50MP</span>
              <span className="feature-label">Resolution</span>
            </div>
            <div className="feature">
              <span className="feature-value">RAW</span>
              <span className="feature-label">Format</span>
            </div>
            <div className="feature">
              <span className="feature-value">∞</span>
              <span className="feature-label">Possibilities</span>
            </div>
          </div>
          <button className="service-cta">Learn More</button>
        </div>
      </section>

      <section className="service-section software">
        <div className="service-content">
          <h2>Software Design</h2>
          <p>Innovative solutions engineered for excellence</p>
          <div className="service-features">
            <div className="feature">
              <span className="feature-value">UI/UX</span>
              <span className="feature-label">Design</span>
            </div>
            <div className="feature">
              <span className="feature-value">100%</span>
              <span className="feature-label">Custom</span>
            </div>
            <div className="feature">
              <span className="feature-value">24/7</span>
              <span className="feature-label">Support</span>
            </div>
          </div>
          <button className="service-cta">Learn More</button>
        </div>
      </section>
    </div>
  );
};

export default Services;
