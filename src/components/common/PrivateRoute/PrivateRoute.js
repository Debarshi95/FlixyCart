import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../providers/AuthProvider/AuthProvider';

const PrivateRoute = ({ children, redirectTo }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};
PrivateRoute.defaultProps = {
  redirectTo: '/',
};
export default PrivateRoute;
