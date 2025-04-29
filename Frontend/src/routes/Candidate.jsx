import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CandidateList = () => {
    console.log("CandidateList component loaded");
    
  localStorage.removeItem("token");

  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [message, setMessage] = useState(null); // for showing errors or success

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cnic = queryParams.get("cnic");

  useEffect(() => {
    fetch("/candidates.json")
      .then((response) => response.json())
      .then((data) => setCandidates(data))
      .catch((error) => {
        console.error("Error fetching candidates:", error);
        setMessage({ type: "error", text: "Failed to load candidates." });
      });

  }, [navigate]);

  const handleCandidateClick = (candidate) => {
    setSelectedCandidate(candidate);
    setMessage(null); // clear any previous message
  };

  const handleOkClick = async () => {
    if (!selectedCandidate) {
      setMessage({ type: "error", text: "Please select a candidate before submitting!" });
      return;
    }

    const voteData = {
      cnic,
      candidate: {
        name: selectedCandidate.name,
        symbol: selectedCandidate.symbol,
      },
    };

    try {
      const response = await axios.post("http://localhost:3000/api/vote/vote", voteData);
      if (response.status === 200) {
        setMessage({ type: "success", text: "Vote successfully submitted!" });
        setTimeout(() => navigate("/"), 1500); // redirect after short delay
      }
    } catch (error) {
      console.error("Error submitting vote:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to submit vote. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Candidates List</h1>

      {cnic && (
        <div className="mb-2">
          <h2 className="text-xl font-semibold">Your CNIC: {cnic}</h2>
        </div>
      )}

      {message && (
        <div
          className={`mb-4 px-4 py-2 rounded text-white font-semibold ${
            message.type === "error" ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {candidates.map((candidate, index) => (
          <div
            key={index}
            className={`p-4 bg-white shadow-md rounded text-center cursor-pointer ${
              selectedCandidate?.name === candidate.name ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => handleCandidateClick(candidate)}
          >
            <h2 className="text-lg font-bold mb-2">{candidate.name}</h2>
            <img
              className="mt-5 h-[120px] w-[180px] mx-auto object-contain"
              src={candidate.symbol}
              alt={candidate.name}
            />
          </div>
        ))}
      </div>

      {selectedCandidate && (
        <div className="mt-6">
          <button
            onClick={handleOkClick}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            OK
          </button>
        </div>
      )}
    </div>
  );
};

export default CandidateList;
