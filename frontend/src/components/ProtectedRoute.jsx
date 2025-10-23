import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin_authenticated');
    if (isAuthenticated !== 'true') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const isAuthenticated = localStorage.getItem('admin_authenticated');
  
  if (isAuthenticated !== 'true') {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;