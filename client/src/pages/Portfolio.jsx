import HomePortfolio from "../Section/PortfolioComponent/HomePortfolio";
import About from "../Section/PortfolioComponent/About";
import Skills from "../Section/PortfolioComponent/Skills";
import Projects from "../Section/PortfolioComponent/Projects";
import Contact from "../Section/PortfolioComponent/Contact";
import Navbar from "../Section/PortfolioComponent/Navbar";

export default function Portfolio(){
    return(
        <div>
            <Navbar/>
            <HomePortfolio/>
            <About/>
            <Skills/>
            <Projects/>
            <Contact/>
        </div>
    );
}