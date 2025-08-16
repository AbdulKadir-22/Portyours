import React from 'react';
import '../Styles/About.css';
import sketch from '../../assets/sketch.jpg';

function About() {
  return (
    <section className="about" id="about">
      <div className="about-text">
        <h2>About me</h2>
        <h3>
          <span className="highlight">Current profeesion and namesake</span><br />
          who wants to be an <span className="highlight">Something</span>
        </h3>
        <p>
          About your skills , passion , hobbies and interset
        </p>
        <a href="/projects" className="about-btn">View Portfolio</a>
      </div>
      <div className="about-img">
        <img src={sketch} alt="sketch" />
      </div>
    </section>
  );
}

export default About;
