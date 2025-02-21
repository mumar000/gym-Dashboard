import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (email === "admin" && password === "admin") {
      // Redirect to dashboard
      navigate("/dashboard");
    } else {
      // Show error message
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#4682b4]">
      <div className="bg-white w-[300px] p-4 rounded-lg shadow-md">
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">Login</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text" // Changed to text to allow "admin" as input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#add8e6] focus:border-[#add8e6]"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#add8e6] focus:border-[#add8e6]"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-[#4682b4] text-white py-2 px-4 rounded-md hover:bg-[#87CEEB] focus:outline-none focus:ring-2 focus:ring-[#add8e6]"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          {/* Add any additional text or links here */}
        </p>
      </div>
    </div>
  );
};

export default Login;