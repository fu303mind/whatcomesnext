import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newUsersToday: 0
  });
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className="admin-logout-btn">
            Sign Out
          </button>
        </div>
      </header>

      <div className="admin-content">
        <div className="admin-stats">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p className="stat-number">{stats.totalUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Active Users</h3>
            <p className="stat-number">{stats.activeUsers}</p>
          </div>
          <div className="stat-card">
            <h3>New Users Today</h3>
            <p className="stat-number">{stats.newUsersToday}</p>
          </div>
        </div>

        <div className="admin-panels">
          <div className="admin-panel">
            <h2>User Management</h2>
            <div className="panel-content">
              <button className="admin-action-btn">View All Users</button>
              <button className="admin-action-btn">Manage Permissions</button>
              <button className="admin-action-btn">User Reports</button>
            </div>
          </div>

          <div className="admin-panel">
            <h2>Content Management</h2>
            <div className="panel-content">
              <button className="admin-action-btn">Edit Pages</button>
              <button className="admin-action-btn">Manage Media</button>
              <button className="admin-action-btn">Update News</button>
            </div>
          </div>

          <div className="admin-panel">
            <h2>System Settings</h2>
            <div className="panel-content">
              <button className="admin-action-btn">Security Settings</button>
              <button className="admin-action-btn">Email Configuration</button>
              <button className="admin-action-btn">System Logs</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
