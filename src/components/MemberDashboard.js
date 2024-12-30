import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './MemberDashboard.css';

export default function MemberDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Member Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Sign Out
        </button>
      </div>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Welcome back</h2>
          <p className="user-email">{user?.email}</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Your Profile</h3>
            <p>Manage your account settings and preferences</p>
            <button className="dashboard-button">View Profile</button>
          </div>

          <div className="dashboard-card">
            <h3>Member Resources</h3>
            <p>Access exclusive content and resources</p>
            <button className="dashboard-button">Browse Resources</button>
          </div>

          <div className="dashboard-card">
            <h3>Community</h3>
            <p>Connect with other members</p>
            <button className="dashboard-button">Join Discussion</button>
          </div>

          <div className="dashboard-card">
            <h3>Updates</h3>
            <p>Stay informed about the latest developments</p>
            <button className="dashboard-button">View Updates</button>
          </div>
        </div>
      </div>
    </div>
  );
}
