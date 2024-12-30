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

// Import auth components
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import SignUp from './components/SignUp';
import MemberDashboard from './components/MemberDashboard';
import AdminDashboard from './components/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <ErrorBoundary>
        <AuthProvider>
          <div className="App">
            <nav>
              <div className="nav-container">
                <Link to="/" className="logo">WHATCOMESNEXT</Link>
                <button 
                  className="mobile-menu-button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {mobileMenuOpen ? (
                      <path d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
                <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
                  <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                  <Link to="/portfolio" onClick={() => setMobileMenuOpen(false)}>Portfolio</Link>
                  <Link to="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
                  <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                  <Link to="/login" className="auth-nav-link" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                </div>
              </div>
            </nav>

            <Routes>
              <Route path="/" element={
                <div className="home-container">
                  <HomePage />
                </div>
              } />
              <Route path="/portfolio" element={
                <ErrorBoundary>
                  <Portfolio />
                </ErrorBoundary>
              } />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route 
                path="/member-dashboard" 
                element={
                  <PrivateRoute>
                    <MemberDashboard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/admin-dashboard" 
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } 
              />
            </Routes>
          </div>
        </AuthProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
