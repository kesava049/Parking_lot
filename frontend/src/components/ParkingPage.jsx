import React, { useState } from "react";
import axios from "axios";

export default function ParkingPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(""); 

  const handleSubmit = async () => {
    const vehicleType = document.getElementById("vehicleType").value;
    const numberPlate = document.getElementById("numberPlate").value;

    try {
      const response = await axios.post("http://localhost:3000/api/park", { 
        vehicleType,
        numberPlate,
      });

      setMessage(response.data.message);
      setError(""); 
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      
      
      setError(error.response?.data?.msg || "❌ Failed to park vehicle");
      setMessage(""); 
    }

    
    setTimeout(() => {
      setMessage("");
      setError("");
    }, 3000);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-200">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">🚗 Park Vehicle</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <label className="block mb-2 text-lg font-semibold">Vehicle Type</label>
        <select id="vehicleType" className="w-full p-2 border rounded">
          <option value="Car">Car</option>
          <option value="Bike">Bike</option>
        </select>

        <label className="block mt-4 mb-2 text-lg font-semibold">Number Plate</label>
        <input id="numberPlate" type="text" className="w-full p-2 border rounded" placeholder="Enter Number Plate" />

        <button 
          onClick={handleSubmit} 
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Park Vehicle
        </button>

        {message && <p className="mt-4 text-green-500">{message}</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>} 
      </div>
    </div>
  );
}