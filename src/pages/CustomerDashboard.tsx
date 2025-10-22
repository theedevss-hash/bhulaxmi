// src/pages/CustomerDashboard.tsx
import React, { useEffect, useState } from "react";
import { getLoggedInCustomer, logoutCustomer } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const [customer, setCustomer] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getLoggedInCustomer();
    if (!user) navigate("/customer/login");
    else setCustomer(user);
  }, [navigate]);

  const handleLogout = () => {
    logoutCustomer();
    navigate("/");
  };

  if (!customer) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-yellow-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full text-center">
        <h2 className="text-2xl font-bold text-amber-700 mb-2">
          Welcome, {customer.name}!
        </h2>
        <p className="text-gray-600 mb-4">Email: {customer.email}</p>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default CustomerDashboard;
