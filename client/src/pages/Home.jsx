import { NavLink, useNavigate } from 'react-router-dom';
import port1 from '../assets/port1.png';
import port2 from '../assets/port2.png';
import Navigation from '../components/Navigation'; // Assuming you have this component

const Home = () => {
  const navigate = useNavigate();

  // This function checks for the auth token and navigates accordingly.
  const handleCreateClick = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // User is logged in, go to the form.
      navigate('/form');
    } else {
      // User is not logged in, go to signup.
      navigate('/signup');
    }
  };

  return (
    <div className="bg-[#FDE7A8] min-h-screen font-sans">
      {/* The Navigation component is placed outside the main flex container */}
      {/* to allow it to be positioned correctly (e.g., fixed at the top). */}
      <Navigation />
      
      {/* Main content section, centered vertically and horizontally */}
      <div className="flex items-center justify-center min-h-screen pt-24"> {/* Added padding-top to avoid overlap with fixed nav */}
        <section className="flex flex-col md:flex-row justify-around items-center w-full px-6 md:px-20">
          
          {/* Text content container */}
          <div className="md:w-2/5 text-center md:text-left mb-12 md:mb-0">
            
            <h1 className="text-6xl font-bold text-[#D49F03]">Portyours</h1>

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
                onClick={handleCreateClick} // Using the smart navigation function
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
    </div>
  );
};

export default Home;
