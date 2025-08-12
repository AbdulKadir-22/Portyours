import React, { useState } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaApple } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios"; 
import backgroundImage from '../assets/background.jpg'

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        formData
      );

      const data = response.data;

      if (data.token) {
        // Success! Save the token and navigate.
        localStorage.setItem("authToken", data.token);
        navigate("/form"); // Or wherever you want to redirect after login
      }
    } catch (err) {
      // FIX: Use err.response.data.error to match the backend's response
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Login failed. Please try again later.");
      }
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen text-white font-sans"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex w-[1000px] bg-[#2e2e4b] rounded-2xl overflow-hidden shadow-lg max-md:flex-col max-md:w-[90%]">
        {/* Form Section */}
        <div className="flex-1 p-12 flex flex-col justify-center max-md:p-6">
          <h2 className="text-4xl font-bold mb-1">Welcome Back</h2>
          <div className="text-sm text-[#a0a0c0] mb-8">
            Don’t have an account?{" "}
            <NavLink to="/signup" className="text-[#8c8cd2] hover:underline">
              Signup
            </NavLink>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-full">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-4 rounded-lg border-none bg-[#3f3f6e] text-white text-base placeholder-[#a0a0c0] focus:outline-none mb-4"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full p-4 rounded-lg border-none bg-[#3f3f6e] text-white text-base placeholder-[#a0a0c0] focus:outline-none"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-5 mb-8">
              <a href="#" className="text-[#8c8cd2] text-sm hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Display Error Message Here */}
            {error && (
              <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full p-4 rounded-lg bg-[#5c5cd6] hover:bg-[#7a7ac9] text-lg font-bold transition-colors"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="flex items-center text-[#a0a0c0] my-8">
              <span className="flex-1 border-t border-[#4a4a6e]"></span>
              <span className="px-4 text-sm">Or Login with</span>
              <span className="flex-1 border-t border-[#4a4a6e]"></span>
            </div>

            <div className="flex justify-center gap-5 flex-wrap">
              <button
                type="button"
                className="w-[150px] p-3 rounded-lg border border-[#4a4a6e] bg-[#3f3f6e] flex items-center justify-center gap-2 hover:bg-[#4a4a6e] transition-colors max-md:w-[40%]"
              >
                <AiOutlineGoogle size={20} />
                <span className="max-md:hidden">Google</span>
              </button>
              <button
                type="button"
                className="w-[150px] p-3 rounded-lg border border-[#4a4a6e] bg-[#3f3f6e] flex items-center justify-center gap-2 hover:bg-[#4a4a6e] transition-colors max-md:w-[40%]"
              >
                <FaApple size={20} />
                <span className="max-md:hidden">Apple</span>
              </button>
            </div>
          </form>
        </div>

        {/* Image Section */}
        <div className="flex-1 max-md:hidden">
          <img
            src="https://i.pinimg.com/736x/69/0a/52/690a52eef949a47fbabcb34b92cbafe3.jpg"
            alt="Login Visual"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
