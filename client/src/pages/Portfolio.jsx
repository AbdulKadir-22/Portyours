import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';

// Import all the presentational components
import Navbar from "../Section/PortfolioComponent/Navbar";
import HomePortfolio from "../Section/PortfolioComponent/HomePortfolio";
import About from "../Section/PortfolioComponent/About";
import Skills from "../Section/PortfolioComponent/Skills";
import Projects from "../Section/PortfolioComponent/Projects";
import Contact from "../Section/PortfolioComponent/Contact";

// A simple loading spinner component
const Loader = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '2rem' }}>
        Loading Portfolio...
    </div>
);

// A simple error message component
const ErrorDisplay = ({ message }) => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'red', padding: '2rem', textAlign: 'center' }}>
        <h2>Error: {message}</h2>
    </div>
);


export default function Portfolio() {
    // ✨ 1. State for data, loading, and errors
    const [portfolioData, setPortfolioData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // ✨ 2. Fetch data when the component mounts
    useEffect(() => {
        const fetchPortfolioData = async () => {
            try {
                const response = await axiosInstance.get('/portfolio');
                setPortfolioData(response.data); // Set the fetched data
            } catch (err) {
                console.error("Error fetching portfolio data:", err);
                // Handle cases where the portfolio is not found (404) vs. other server errors
                if (err.response && err.response.status === 404) {
                    setError("Portfolio not found. Please create one in the form page.");
                } else {
                    setError("Failed to load portfolio data. Please try again later.");
                }
            } finally {
                setIsLoading(false); // Stop loading regardless of outcome
            }
        };

        fetchPortfolioData();
    }, []); // The empty array ensures this runs only once on mount

    // ✨ 3. Conditional Rendering
    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <ErrorDisplay message={error} />;
    }

    // ✨ 4. Pass the fetched data down to child components as props
    return (
        <div>
            <Navbar />
            <HomePortfolio data={portfolioData} />
            <About data={portfolioData} />
            <Skills data={portfolioData} />
            <Projects data={portfolioData} />
            <Contact data={portfolioData} />
        </div>
    );
}