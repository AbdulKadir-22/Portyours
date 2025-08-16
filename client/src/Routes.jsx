import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Form from './pages/Form';
import Portfolio from './pages/Portfolio';
import HomeP from "./Section/PortfolioComponent/HomePortfolio";
import About from "./Section/PortfolioComponent/About";
import Skills from "./Section/PortfolioComponent/Skills";
import Projects from "./Section/PortfolioComponent/Projects";
import Contact from "./Section/PortfolioComponent/Contact";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home/>}/>
      <Route path="/form" element={<Form/>}/>
      <Route path="/portfolio" element = {<Portfolio/>}/>
             {/* Routes of Portfoilo Section */}
             <Route path="/HomePortfolio" element={<HomeP />} />
             <Route path="/About" element={<About />} />
             <Route path="/Skills" element={<Skills />} />
             <Route path="/Projects" element={<Projects />} />
             <Route path="/Contact" element={<Contact />} />
    </Routes>
  );
};

export default AppRoutes;