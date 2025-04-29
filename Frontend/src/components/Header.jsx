import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
  return (
    <header className=" bg-green-600 text-white ">
      <div className="max-w-[80%] mx-auto py-5 flex justify-between items-center">
      <div onClick={() => {navigate("/")}} className="text-3xl font-bold cursor-pointer">Online Voting System</div>
      <div>
        <Link
          to="/login"
          className="bg-green-700 text-white text-[22px] px-4 py-2 rounded hover:bg-green-800 transition duration-300"
          >
          Admin Login
        </Link>
      </div>
          </div>
    </header>
  );
};

export default Header;
