import React from 'react';
import '../Styles/Projects.css';
import ProjectCard from '../PortfolioComponent/ProjectCard';

// ✨ This component now receives the 'data' prop
function Projects({ data }) {
    const projects = data?.projects || []; // Default to an empty array

    return (
        <section className="projects-section" id="projects">
            <div className="projects-header">
                <h2>My Portfolio</h2>
                <p>Some of the projects I've worked on</p>
            </div>
            <div className="projects-grid">
                {/* ✨ Map over the dynamic 'projects' array */}
                {projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        title={project.title}
                        description={project.description}
                        image={project.imageUrl} // Use the dynamic imageUrl
                    />
                ))}
            </div>
        </section>
    );
}

// ✨ No changes needed for ProjectCard, as it already accepts these props!

export default Projects;