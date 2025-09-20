import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // ✨ Import useParams to read the URL
import axiosInstance from '../api/axios.js';

// Import all the presentational components
import Navbar from "../Section/PortfolioComponent/Navbar";
import HomePortfolio from "../Section/PortfolioComponent/HomePortfolio";
import About from "../Section/PortfolioComponent/About";
import Skills from "../Section/PortfolioComponent/Skills";
import Projects from "../Section/PortfolioComponent/Projects";
import Contact from "../Section/PortfolioComponent/Contact";

// A simple loading spinner component
const Loader = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '2rem', fontFamily: 'sans-serif' }}>
        Loading Portfolio...
    </div>
);

// A simple error message component
const ErrorDisplay = ({ message }) => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#B22222', padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h2>Error: {message}</h2>
    </div>
);


export default function Portfolio() {
    // ✨ 1. Get the username from the URL if it exists
    const { username } = useParams();

    // ✨ 2. State management remains the same
    const [portfolioData, setPortfolioData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // ✨ 3. The data fetching logic is now dynamic
    useEffect(() => {
        const fetchPortfolioData = async () => {
            // Determine the correct API endpoint based on the URL
            const apiUrl = username 
                ? `/portfolio/${username}` // Public route
                : '/portfolio';             // Private route for logged-in user

            try {
                const response = await axiosInstance.get(apiUrl);
                setPortfolioData(response.data); // Set the fetched data
            } catch (err) {
                console.error("Error fetching portfolio data:", err);
                if (err.response && err.response.status === 404) {
                    setError(`This portfolio could not be found. Please check the username or create a portfolio if it's yours.`);
                } else {
                    setError("Failed to load portfolio data. The server might be down.");
                }
            } finally {
                setIsLoading(false); // Stop loading regardless of outcome
            }
        };

        fetchPortfolioData();
    }, [username]); // The effect re-runs if the username in the URL changes

    // ✨ 4. Conditional Rendering Logic
    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <ErrorDisplay message={error} />;
    }

    // ✨ 5. Pass the fetched data down to child components
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
