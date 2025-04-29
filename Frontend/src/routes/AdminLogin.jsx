import React, { useState } from "react"; // Import React and useState hook
import axios from "axios"; // Import Axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Import hook to programmatically navigate

const AdminLogin = () => {
  localStorage.removeItem("token"); // Remove any existing token from localStorage on load

  const navigate = useNavigate(); // Get navigation function
  const [username, setUsername] = useState(""); // State for username input
  const [password, setPassword] = useState(""); // State for password input
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    setErrorMessage(""); // Clear any previous error message

    try {
      // Send login request to the backend
      const response = await axios.post("http://localhost:3000/api/admin/adminLogin", {
        username,
        password,
      });

      // If login is successful
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // Save token in localStorage
        navigate("/admindashboard"); // Navigate to admin dashboard
      }
    } catch (error) {
      // If there's an error, display it
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message); // Show specific error
      } else {
        setErrorMessage("An error occurred. Please try again later."); // Show generic error
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage: "url('/images/election-bg.jpg')", // Background image from public/images
      }}
    >
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md backdrop-blur-md bg-opacity-90">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6">
          <img src="/election.svg" alt="Election Logo" className="h-[270px] mb-2" />
          <h1 className="text-2xl font-bold text-green-700">Admin Panel Access</h1>
          <p className="text-[16px] text-gray-600">Authorized Person only</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-[18px] font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update state on change
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-[18px] focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your username"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-[18px] font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state on change
              required
              className="w-full border border-gray-300 text-[18px] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-600 text-sm mb-4">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin; // Export the component to use it in your app
