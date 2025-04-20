import React, { useState } from "react";
import axios from "axios";
import Message from "./Message";

export default function SearchVehicle() {
  const [message, setMessage] = useState("");
  const [vehicleType, setVehicleType] = useState("Car");
  const [numberPlate, setNumberPlate] = useState("");

  const handleSearch = async () => {
    if (!numberPlate) {
      setMessage("❌ Please enter a number plate!");
      return;
    }
  
    setMessage(`🔍 Searching for your ${vehicleType}...`);
  
    try {
      const response = await axios.get("http://localhost:3000/api/search", {
        params: { numberPlate },
      });
  
      setMessage(response.data.msg);
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Vehicle not found!");
    }
  
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-200">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-green-600 mb-6">🔍 Search Vehicle</h1>

      <div className="flex items-start bg-white p-10 rounded-lg shadow-lg">
        <div className="w-96 p-6 bg-gray-100 rounded-lg shadow-md">
          {/* Vehicle Type - Radio Buttons */}
          <label className="block mb-2 text-lg font-semibold">Vehicle Type</label>
          <div className="flex space-x-4 mb-4">
            <label className="flex items-center space-x-2">
              <input 
                type="radio" 
                value="Car" 
                checked={vehicleType === "Car"} 
                onChange={() => setVehicleType("Car")} 
                className="w-5 h-5"
              />
              <span>🚗 Car</span>
            </label>
            <label className="flex items-center space-x-2">
              <input 
                type="radio" 
                value="Bike" 
                checked={vehicleType === "Bike"} 
                onChange={() => setVehicleType("Bike")} 
                className="w-5 h-5"
              />
              <span>🏍 Bike</span>
            </label>
          </div>

          {/* Number Plate Input */}
          <label className="block mb-2 text-lg font-semibold">Number Plate</label>
          <input 
            type="text" 
            value={numberPlate}
            onChange={(e) => setNumberPlate(e.target.value)}
            className="w-full p-2 border rounded" 
            placeholder="Enter Number Plate" 
          />

          {/* Search Button */}
          <button 
            onClick={handleSearch} 
            className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Search Vehicle
          </button>
        </div>

        {/* Right Side - Message */}
        <Message message={message} />
      </div>
    </div>
  );
}