import React from 'react';
import '../Styles/About.css';
// import sketch from '../../assets/sketch.jpg'; // No longer needed

// ✨ Accepts a 'data' prop
function About({ data }) {
  const aboutData = data?.about;

  return (
    <section className="about" id="about"> {/* ✨ Added id="about" */}
      <div className="about-text">
        <h2>About me</h2>
        <h3>
            {/* ✨ Note: The structure in the form is different from this static text. */}
            {/* We will display the 'aboutYourself' content here. */}
            <span className="highlight">{aboutData?.course || 'My Course/Field'}</span>
        </h3>
        <p>{aboutData?.aboutYourself || 'About your skills, passion, hobbies and interest'}</p>
        <a href="#projects" className="about-btn">View Portfolio</a>
      </div>
      <div className="about-img">
        <img src={aboutData?.aboutImage || 'https://via.placeholder.com/300'} alt="About me" />
      </div>
    </section>
  );
}

export default About;