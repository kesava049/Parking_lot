import React from "react";

export default function Message({ message }) {
  if (!message) return null; 

  return (
    <div className="fixed right-5 top-20 p-4 bg-green-500 text-white rounded-lg shadow-lg transition-all duration-300">
      {message}
    </div>
  );
}