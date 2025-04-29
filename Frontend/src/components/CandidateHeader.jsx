import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CandidateHeader = () => {
    const navigate = useNavigate();
  return (
    <header className=" bg-green-600 text-white ">
      <div className="max-w-[80%] mx-auto py-5 flex justify-between items-center">
      <div onClick={() => {navigate("/")}} className="text-3xl font-bold cursor-pointer">Online Voting System</div>
     
          </div>
    </header>
  );
};

export default CandidateHeader;
