import React from 'react';
import '../Styles/HomePortfolio.css';
import profile from '../../assets/profile.jpg';

function HomePortfolio() {
  return (
    <section className="home">
      <div className="home-text">
        <h2>Hello, I'm</h2>
        <h1>Your Name</h1>
        <h3>Your Profession</h3>
        <p>
          Your Passion, job and goals
        </p>
        <a href="#about" className="home-btn">About Me</a>
      </div>
      <div className="home-img">
        <img src={profile} alt="profile" />
      </div>
    </section>
  );
}

export default HomePortfolio;
