import React from 'react';
import '../Styles/Skills.css';

// ✨ UPDATED SkillCard component
function SkillCard({ iconUrl, name }) {
    return (
        <div className="skill-card">
            <div className="skill-icon">
                <img 
                    src={iconUrl || 'https://via.placeholder.com/50'} 
                    alt={`${name} icon`} 
                    style={{ width: '50px', height: '50px', margin: '0 auto', objectFit: 'contain' }}
                />
            </div>
            <h4>{name || 'Skill Name'}</h4>
            {/* DELETED the <p> tag for level */}
        </div>
    );
}

function Skills({ data }) {
    const aboutSkills = data?.skills?.aboutSkills || "Let’s explore the skills and experience I have!";
    const skillIcons = data?.skills?.skillIcons || [];

    return (
        <section className="skills-section" id="skills">
            <div className="skills-header">
                <h2>My Skills</h2>
                <p>{aboutSkills}</p>
            </div>
            <div className="skills-grid">
                {skillIcons.map((skill, index) => (
                    <SkillCard
                        key={index}
                        iconUrl={skill.iconUrl}
                        name={skill.name}
                    />
                ))}
            </div>
        </section>
    );
}

export default Skills;