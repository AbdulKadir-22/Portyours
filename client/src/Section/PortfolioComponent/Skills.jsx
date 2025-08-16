import React from 'react';
import '../Styles/Skills.css';
import skills from '../Data/Skills';
import SkillCard from '../PortfolioComponent/SkillCard';

function Skills() {
  return (
    <section className="skills-section">
      <div className="skills-header">
        <h2>My Skills</h2>
        <p>Let’s explore the skills and experience I have!</p>
      </div>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <SkillCard
            key={index}
            icon={skill.icon}
            name={skill.name}
            level={skill.level}
          />
        ))}
      </div>
    </section>
  );
}

export default Skills;
