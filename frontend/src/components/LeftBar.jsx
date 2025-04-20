import React from "react";

export default function LeftBar({ setActivePage }) {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 shadow-lg flex flex-col gap-4">
      <h2 className="text-xl font-bold text-center">Menu</h2>
      
      <button 
        onClick={() => setActivePage("park")}
        className="bg-blue-600 hover:bg-blue-700 py-2 rounded text-lg"
      >
        🚗 Park Vehicle
      </button>

      <button 
        onClick={() => setActivePage("search")}
        className="bg-green-600 hover:bg-green-700 py-2 rounded text-lg"
      >
        🔍 Search Vehicle
      </button>

      <button 
        onClick={() => setActivePage("pickup")}
        className="bg-red-600 hover:bg-red-700 py-2 rounded text-lg"
      >
        🏁 Pickup Vehicle
      </button>
    </div>
  );
}