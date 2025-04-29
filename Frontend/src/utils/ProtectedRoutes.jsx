import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoutes = ({ children }) => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/api/authcheck/adminauth", {
  //         withCredentials: true, // Include cookies in the request
  //       });        
  //       console.log(response)
  //       if (response.status === 200) {
  //         setIsAuthenticated(true); // User is authenticated
  //       } else {
  //         navigate("/login"); // Redirect to login if not authenticated
  //       }
  //     } catch (error) {
  //       console.error("Error during authentication check:", error);
  //       navigate("/login"); // Redirect to login on error
  //     } finally {
  //       setIsLoading(false); // Stop loading
  //     }
  //   };

  //   checkAuth();
  // }, [navigate]);

  // if (isLoading) {
  //   // Show a loading spinner or message while checking authentication
  //   return <div>Loading...</div>;
  // }

  // if (!isAuthenticated) {
  //   // If not authenticated, render nothing (navigate will handle redirection)
  //   return null;
  // }

  // Get token from localStorage
const token = localStorage.getItem('token');
console.log(token);


if (token) {
  console.log('auth');
  
  // Render children if authenticated
  return children;
} else {
  console.log('not');
  useEffect(() => {
    navigate('/login')
  })
}


};

export default ProtectedRoutes;
