import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';

const PrivateRoute = ({ element: Element }) => {
  const { token } = useAuth();
  console.log('PrivateRoute: token', token);

  return token ? <Element /> : <Navigate to="/Login" />;
};

export default PrivateRoute;
