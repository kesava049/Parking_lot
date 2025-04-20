import React from "react";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-4 shadow-md flex items-center justify-between px-6">
      <h1 className="text-white text-3xl font-bold tracking-wide uppercase">
        🚗 Parking Lot Application 🅿️
      </h1>
      <button
        onClick={handleLogout}
        className="bg-white text-blue-600 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
      >
        Logout
      </button>
    </div>
  );
}