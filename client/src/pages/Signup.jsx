import React, { useState } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaApple } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios"; // use your configured Axios instance

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // FIX: Changed keys to match the backend schema (firstname, lastname)
    const payload = {
      firstname: formData.firstName,
      lastname: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    try {
      // Assuming your axiosInstance is configured with the base URL (e.g., http://localhost:5000/api)
      const res = await axiosInstance.post("/user/signup", payload);

      // Your backend sends back { email, token }, not a message.
      // Let's create a success message ourselves.
      setSuccess("Account created successfully! Redirecting to login...");
      
      // Store the token if you want to log them in automatically 
      // localStorage.setItem('token', res.data.token);

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      // Use the error message from your backend API
      setError(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1a1a2e] min-h-screen flex items-center justify-center text-white font-sans">
      <div className="flex w-[1000px] bg-[#2e2e4b] rounded-2xl shadow-lg overflow-hidden flex-col md:flex-row">
        {/* Image Section */}
        <div className="hidden md:block flex-1">
          <img
            src="https://i.pinimg.com/736x/69/0a/52/690a52eef949a47fbabcb34b92cbafe3.jpg"
            alt="Signup Visual"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="flex-1 p-12 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Create an Account
          </h2>
          <div className="text-sm text-[#a0a0c0] mb-6">
            Already have an account?
            <NavLink to="/login" className="text-[#8c8cd2] ml-1">
              Login
            </NavLink>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-5 mb-5">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="flex-1 p-4 rounded-lg bg-[#3f3f6e] text-white placeholder-[#a0a0c0] border-none outline-none"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="flex-1 p-4 rounded-lg bg-[#3f3f6e] text-white placeholder-[#a0a0c0] border-none outline-none"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col mb-5">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-4 rounded-lg bg-[#3f3f6e] text-white placeholder-[#a0a0c0] border-none outline-none mb-4"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full p-4 rounded-lg bg-[#3f3f6e] text-white placeholder-[#a0a0c0] border-none outline-none"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="terms"
                required
                className="mr-3 accent-[#5c5cd6]"
              />
              <label htmlFor="terms" className="text-sm text-[#a0a0c0]">
                I agree with the{" "}
                <a href="#" className="text-[#8c8cd2]">
                  Terms and Conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full p-4 rounded-lg bg-[#5c5cd6] text-white font-bold text-lg hover:bg-[#7a7ac9] transition-colors"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

            {error && <p className="text-red-400 mt-3 text-center">{error}</p>}
            {success && <p className="text-green-400 mt-3 text-center">{success}</p>}

            <div className="flex items-center my-8 text-[#a0a0c0]">
              <span className="flex-1 border-t border-[#4a4a6e]"></span>
              <span className="mx-4">Or register with</span>
              <span className="flex-1 border-t border-[#4a4a6e]"></span>
            </div>

            <div className="flex justify-center gap-4 flex-wrap">
              <button
                type="button"
                className="w-36 p-3 rounded-lg bg-[#3f3f6e] border border-[#4a4a6e] flex items-center justify-center gap-2 hover:bg-[#4a4a6e] transition-colors"
              >
                <AiOutlineGoogle size={20} />
                <span>Google</span>
              </button>
              <button
                type="button"
                className="w-36 p-3 rounded-lg bg-[#3f3f6e] border border-[#4a4a6e] flex items-center justify-center gap-2 hover:bg-[#4a4a6e] transition-colors"
              >
                <FaApple size={20} />
                <span>Apple</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
