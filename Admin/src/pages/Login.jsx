import React, { useState, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [loginType, setLoginType] = useState("Admin");
  const { setAdminToken } = useContext(AdminContext);
  const { loginDoctor } = useContext(DoctorContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (loginType === "Admin") {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
        if (data.success) {
          localStorage.setItem("adminToken", data.token);
          setAdminToken(data.token);
          toast.success("Admin login successful!");
          // Optionally, redirect to admin dashboard here
        } else {
          toast.error(data.message || "Login failed");
        }
      } else {
        // Doctor login
        const res = await loginDoctor(email, password);
        if (res.success) {
          toast.success("Doctor login successful!");
          // Optionally, redirect to doctor dashboard here
        } else {
          toast.error(res.message || "Login failed");
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
      console.log(error);
    }
  };

  const toggleLoginType = () => {
    setLoginType((prev) => (prev === "Admin" ? "Doctor" : "Admin"));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-6">
          <span className="text-blue-600">{loginType}</span> Login
        </h2>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Toggle Link */}
        <p className="mt-4 text-center">
          {loginType === "Admin" ? (
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={toggleLoginType}
            >
              Doctor Login? Click here
            </span>
          ) : (
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={toggleLoginType}
            >
              Admin Login? Click here
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;