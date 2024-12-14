import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {jwtDecode} from 'jwt-decode'; // To decode JWT

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to provide auth context to its children
const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [tripId, setTripId] = useState(localStorage.getItem("tripId"));
  const [userName, setUserName_] = useState(localStorage.getItem("userName"));
  const [userID, setUserID_] = useState(localStorage.getItem("userID"));
  const [isTokenExpired, setIsTokenExpired] = useState(false); // To track token expiration

  const setToken = (newToken) => {
    setToken_(newToken);
    if (newToken) {
      const decoded = jwtDecode(newToken);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // Token has expired
        setIsTokenExpired(true);
        setToken_(null); // Clear token
        localStorage.removeItem('token');
      } else {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
        localStorage.setItem('token', newToken);
      }
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  };

  const setTripID = (newTripId) => {
    setTripId(newTripId);
  };

  const setUserName = (userName) => {
    setUserName_(userName);
  };

  const setUserID = (newUserID) => {
    setUserID_(newUserID);
  };

  // Effect to check token expiration on each render
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      // If token is expired
      if (decoded.exp < currentTime) {
        setIsTokenExpired(true);
        setToken(null); // Clear expired token
        alert("Session expired. Please log in again.");
        // You can navigate to login here if you're using a router
      } else {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        localStorage.setItem('token', token);
      }
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  const contextValue = useMemo(() => ({
    token,
    setToken,
    tripId,
    setTripID,
    userName,
    setUserName,
    userID,
    setUserID,
    isTokenExpired,
  }), [token, tripId, userID, isTokenExpired]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
