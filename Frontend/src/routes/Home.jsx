import React, { useState } from "react"; // Import React and useState hook
import axios from "axios"; // Import axios for HTTP requests
import { useNavigate } from "react-router-dom"; // Import navigate function to redirect

const Home = () => {
    localStorage.removeItem("token"); // Clear any stored token when this component loads

    // Define state variables for form data and error messages
    const [cnic, setCnic] = useState("");
    const [password, setPassword] = useState("");
    const [cnicError, setCnicError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [generalError, setGeneralError] = useState("");

    const navigate = useNavigate(); // Hook to programmatically navigate to other pages

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page refresh on form submit
        setCnicError("");
        setPasswordError("");
        setGeneralError("");

        const cnicRegex = /^\d{13}$/; // Regex to check for exactly 13 digits
        if (!cnicRegex.test(cnic)) {
            setCnicError("CNIC must be exactly 13 digits.");
            return; // Exit if CNIC is invalid
        }

        if (!password) {
            setPasswordError("Password is required.");
            return; // Exit if password is empty
        }

        try {
            // Send POST request to check voting status
            const response = await axios.post("http://localhost:3000/api/voter/checkVote", {
                cnic,
                password,
            });

            console.log(response);
            if (response.status === 200) {
                if (response.data.hasVoted) {
                    setGeneralError("You have already cast your vote."); // Show message if already voted
                } else {
                    console.log('moving to candidate page');
                    console.log(cnic);
                    
                    
                    
                    // sessionStorage.setItem("navigatedFromHome", "true"); // Set flag to confirm correct navigation
                    navigate(`/candidate?cnic=${cnic}`); // Redirect to candidate voting page
                }
            }
        } catch (error) {
            // Handle server or network errors
            if (error.response && error.response.data.message) {
                setGeneralError(error.response.data.message);
            } else {
                setGeneralError("An error occurred. Please try again later.");
            }
        }
    };

    // Function to handle CNIC input and limit to 13 digits
    const handleCnicChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,13}$/.test(value)) {
            setCnic(value);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="max-w-[80%] bg-white shadow-2xl py-5 rounded-2xl overflow-hidden flex flex-col md:flex-row justify-around w-full ">

                {/* Left Section - Image */}
                <div className="">
                    <img
                        src="/election.svg" // Election image
                        alt="Voting Illustration"
                        className="w-full h-full object-cover py-7"
                    />
                </div>

                {/* Right Section - Form */}
                <div className="flex items-center">
                    <div className="">
                        <h1 className="text-4xl font-bold text-center text-green-700 mb-6">
                            Welcome to the Digital Ballot Box
                        </h1>

                        <form onSubmit={handleSubmit}>
                            {/* CNIC Input Field */}
                            <div className="mb-4">
                                <label htmlFor="cnic" className="block text-gray-700 text-[18px] font-semibold mb-2">
                                    Enter CNIC (without dashes)
                                </label>
                                <input
                                    type="text"
                                    id="cnic"
                                    name="cnic"
                                    placeholder="1234512345678"
                                    value={cnic}
                                    onChange={handleCnicChange}
                                    required
                                    maxLength={13}
                                    className="w-full border rounded px-3 text-[18px] py-2 shadow focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                {cnicError && <p className="text-red-500 text-[16px] mt-1">{cnicError}</p>}
                            </div>

                            {/* Password Input Field */}
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700 text-[18px] font-semibold mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full border rounded px-3 py-2 text-[18px] shadow focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                {passwordError && <p className="text-red-500 text-[16px] mt-1">{passwordError}</p>}
                            </div>

                            {/* General Error Message */}
                            {generalError && (
                                <div className="mb-4">
                                    <p className="text-red-600 text-[16px] text-center">{generalError}</p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
