import React, { useState } from "react";
import axios from "axios";

export default function PickupPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [vehicleData, setVehicleData] = useState(null);

  const handlePickup = async () => {
    const vehicleType = document.getElementById("vehicleType").value;
    const numberPlate = document.getElementById("numberPlate").value;

    try {
        const response = await axios.post("http://localhost:3000/api/pickup", {
            type: vehicleType,
            plate: numberPlate,
        });

        const data = response.data.message;

        setVehicleData({
            vehicleType,
            numberPlate,
            totalRent: data.totalRent, 
        });

        setMessage(
            `🕒 ${data.startTime}\n` +
            `🕒 ${data.currentTime}\n` +
            `⏳ ${data.totalTime}\n` + 
            `💰 ${data.totalRent}`
        );

        setError("");
        setShowPayment(true);
    } catch (err) {
        console.error("❌ Error:", err.response?.data || err.message);
        setError(err.response?.data?.error || "❌ Failed to pick up vehicle");
        setMessage("");
        setShowPayment(false);
    }
};

  const handlePayment = async () => {
    const totalAmount = vehicleData.totalRent;

    try {
        const response = await axios.post("http://localhost:3000/api/payment/order", {
            amount: totalAmount,
        });

        if (response.data.success) {
            console.log("✅ Order Created:", response.data.order);

            const { id, amount, currency } = response.data.order;

            const options = {
                key: "rzp_test_JXBCw60zP349Vt", 
                amount: amount,
                currency: currency,
                order_id: id,
                name: "Parking Lot Payment",
                description: "Payment for parking service",
                handler: function (response) {
                    console.log("✅ Payment Successful:", response);
                    alert("Payment Successful!");
                },
                prefill: {
                    name: "Customer Name",
                    email: "customer@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } else {
            console.error("❌ Payment Failed:", response.data.error);
        }
    } catch (error) {
        console.error("❌ Payment Error:", error);
    }
};

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-200">
      <h1 className="text-3xl font-bold text-red-600 mb-6">🚗 Pickup Vehicle</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <label className="block mb-2 text-lg font-semibold">Vehicle Type</label>
        <select id="vehicleType" className="w-full p-2 border rounded">
          <option value="Car">Car</option>
          <option value="Bike">Bike</option>
        </select>

        <label className="block mt-4 mb-2 text-lg font-semibold">Number Plate</label>
        <input id="numberPlate" type="text" className="w-full p-2 border rounded" placeholder="Enter Number Plate" />

        <button 
          onClick={handlePickup} 
          className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Pickup Vehicle
        </button>

        {message && <p className="mt-4 text-green-500 whitespace-pre-line">{message}</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>

      {showPayment && vehicleData && (
        <div className="bg-white p-6 mt-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800">💳 Payment</h2>
            <p className="mt-2 text-lg">🚗 Vehicle: {vehicleData.vehicleType}</p>
            <p className="text-lg">🔢 Plate Number: {vehicleData.numberPlate}</p>
            <p className="text-lg font-bold text-red-600">💰 Amount: ₹{vehicleData.totalRent}</p>

            <button 
            onClick={handlePayment} 
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
            Pay via Razorpay
            </button>
        </div>
      )}
    </div>
  );
}