import { NavLink, useNavigate } from 'react-router-dom';
import port1 from '../assets/port1.png';
import port2 from '../assets/port2.png';
import Navigation from '../components/Navigation';

const Home = () => {
  // FIX: Initialize the navigate function from the hook
  const navigate = useNavigate();

  return (
    // Added a main container with a background color to match your design
    
    <div className="bg-[#FDE7A8] min-h-screen flex items-center font-sans">
      <Navigation/>
      <section className="flex flex-col md:flex-row justify-around items-center w-full px-6 py-16 md:px-20">
        
        {/* Text content container */}
        <div className="md:w-2/5 text-center md:text-left mb-12 md:mb-0">
          
          {/* Main heading */}
          <h1 className="text-6xl font-bold text-[#D49F03]">Portyours</h1>

          {/* Paragraph text */}
          <p className="text-xl text-gray-800 my-6 leading-relaxed">
            Tired of digging through broken GitHub repos or confusing code just
            to make a portfolio?
            <br />
            With no coding skills required, Portyours makes it simple, fast, and
            clean.
            <br />
            Others are already building theirs — why wait?
          </p>

          {/* Buttons container */}
          <div className="mt-8 flex justify-center md:justify-start gap-4">
            <button
              className="bg-white text-black font-bold py-3 px-8 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
              onClick={() => navigate("/signup")} // Changed to /signup, a likely next step
            >
              Create Yours
            </button>
            <NavLink to="/examples">
              <button className="bg-white text-black font-bold py-3 px-8 rounded-lg shadow-md hover:bg-gray-100 transition-colors">
                See Examples
              </button>
            </NavLink>
          </div>
        </div>

        {/* Image container */}
        <div className="flex gap-6">
          <img
            src={port1}
            alt="Portfolio Preview 1"
            className="w-52 md:w-72 rounded-2xl object-cover shadow-2xl transform -rotate-6 transition-transform hover:rotate-0"
          />
          <img
            src={port2}
            alt="Portfolio Preview 2"
            className="w-52 md:w-72 rounded-2xl object-cover shadow-2xl transform rotate-6 transition-transform hover:rotate-0"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
