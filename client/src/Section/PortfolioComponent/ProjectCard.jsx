import React from 'react';
import '../Styles/ProjectCard.css';

function ProjectCard({ title, description, category, image }) {
  return (
    <div className="project-card">
      <img src={image} alt={title} className="project-img" />
      <div className="project-info">
        <h3>{title}</h3>
        <h4>{category}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default ProjectCard;
