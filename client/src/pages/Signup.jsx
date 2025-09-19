import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import '../Section/Styles/Signup.css'; // ✨ Import the new CSS file

const Signup = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
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

        try {
            await axiosInstance.post("/user/signup", formData);
            setSuccess("Account created successfully! Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                {/* Image Section */}
                <div className="signup-image-section">
                    <img
                        src="https://i.pinimg.com/736x/69/0a/52/690a52eef949a47fbabcb34b92cbafe3.jpg"
                        alt="Visual representation for signup"
                    />
                </div>

                {/* Form Section */}
                <div className="signup-form-section">
                    <h2>Create an Account</h2>
                    <p className="sub-text">
                        Already have an account?
                        <NavLink to="/login" className="login-link"> Login</NavLink>
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <input
                                type="text"
                                name="firstname"
                                placeholder="First Name"
                                className="form-input"
                                value={formData.firstname}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="lastname"
                                placeholder="Last Name"
                                className="form-input"
                                value={formData.lastname}
                                onChange={handleChange}
                            />
                        </div>

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
                            placeholder="Create a strong password"
                            className="form-input"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        {/* --- Messages --- */}
                        {error && <p className="message error-message">{error}</p>}
                        {success && <p className="message success-message">{success}</p>}

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? "Creating..." : "Create Account"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;