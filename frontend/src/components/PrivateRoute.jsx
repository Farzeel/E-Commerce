import React from 'react';
import {  Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


function PrivateRoute({ children }) {
    const isAuthorized = useSelector(state => state.authReducer.isAuthorized);
    const location = useLocation(); // Assuming you have an isAuthenticatedSelector
  
    if (!isAuthorized) {
      return <Navigate to="/login" state={{ from: location.pathname }} />; // Use Navigate to redirect to login
    }

    return children;
  }
export default PrivateRoute;

