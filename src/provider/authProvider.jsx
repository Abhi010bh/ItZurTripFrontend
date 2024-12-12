import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to provide auth context to its children
const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [tripId, setTripId] = useState(localStorage.getItem("tripId")); // Initialize tripId state
  const [userName,setUserName_]=useState(localStorage.getItem("userName"));
  const [userID,setUserID_]=useState(localStorage.getItem("userID"));
   
  

  const setToken = (newToken) => {
    setToken_(newToken);
    
  };

  const setTripID = (newTripId) => {
    console.log(newTripId);
    setTripId(newTripId);
  };

  const setUserName=(userName)=>{
    console.log(userName);
    setUserName_(userName);
    
  }

  const setUserID=(newuserID)=>{
    console.log(newuserID);
    setUserID_(newuserID);
    
  }

  useEffect(() => {
    
    if (token) {
      
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        localStorage.setItem('token', token);
        
      
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      
    }}, [token]);

    const contextValue = useMemo(() => ({
      token,
      setToken,
      tripId, // Include tripId in the context value
      setTripID,
      userName,
      setUserName, // Function to set tripId
      userID,
      setUserID
    }), [token, tripId,userID]);
  

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

/*if (token) {
      const currentTime = Date.now() / 1000;
      if (tokenExpiry < currentTime) {
        // Token is expired
        setToken(null, null);
        navigate('/Login');
      } else {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiry', tokenExpiry);
      }
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiry');
    }}, [token]);*/