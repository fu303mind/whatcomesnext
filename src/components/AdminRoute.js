import React from 'react';
import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
  
  return isAdmin ? children : <Navigate to="/login" />;
}
