import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { useAuth } from "../Context/AuthContext"; // ✨ Import the useAuth hook
import '../Section/Styles/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // ✨ Get the login function from our context

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
            const response = await axiosInstance.post("/user/login", formData);
            const { token } = response.data;

            if (token) {
                // ✨ Use the context's login function to update the global state
                login(token); 
                navigate("/form"); // Navigate to the portfolio form after successful login
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error || "Login failed. Please try again.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                {/* Form Section */}
                <div className="login-form-section">
                    <h2>Welcome Back</h2>
                    <p className="sub-text">
                        Don't have an account?
                        <NavLink to="/signup" className="signup-link"> Signup</NavLink>
                    </p>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="form-input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="form-input"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        
                        <div className="forgot-password-container">
                            <a href="#" className="forgot-password-link">Forgot Password?</a>
                        </div>
                        
                        {/* --- Messages --- */}
                        {error && <p className="message error-message">{error}</p>}

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>

                {/* Image Section */}
                <div className="login-image-section">
                     <img
                        src="https://i.pinimg.com/736x/69/0a/52/690a52eef949a47fbabcb34b92cbafe3.jpg"
                        alt="Visual representation for login"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
