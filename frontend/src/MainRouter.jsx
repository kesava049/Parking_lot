import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import ProtectedRoute from "./ProtectedRoute";
import App from "./App";

function RedirectToAppropriatePage() {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/app" /> : <Navigate to="/login" />;
}

export default function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RedirectToAppropriatePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/app" element={<ProtectedRoute><App /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}