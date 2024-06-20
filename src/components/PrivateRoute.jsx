import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';

const PrivateRoute = ({ element, ...rest }) => {
  const { token } = useAuth();
  console.log('PrivateRoute: token', token);

  return token ? element : <Navigate to="/Login" />;
};

export default PrivateRoute;
