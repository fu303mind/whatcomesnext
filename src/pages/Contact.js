import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="contact-container">
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p className="hero-text">Let's create something extraordinary together</p>
      </section>

      <section className="contact-grid">
        <div className="contact-info">
          <div className="info-card">
            <h3>Visit</h3>
            <p>123 Innovation Drive<br />Silicon Valley, CA 94025</p>
          </div>
          <div className="info-card">
            <h3>Call</h3>
            <p>+1 (555) 123-4567<br />Mon - Fri, 9am - 6pm PST</p>
          </div>
          <div className="info-card">
            <h3>Email</h3>
            <p>hello@whatcomesnext.com<br />support@whatcomesnext.com</p>
          </div>
        </div>

        <div className="contact-form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-grid">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone (optional)"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                />
              </div>
              <div className="form-group full-width">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  required
                ></textarea>
              </div>
            </div>
            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
      </section>

      <section className="contact-cta">
        <div className="cta-content">
          <h2>Ready to Start?</h2>
          <p>Schedule a consultation with our team</p>
          <button className="cta-button">Book Appointment</button>
        </div>
      </section>
    </div>
  );
};

export default Contact;
