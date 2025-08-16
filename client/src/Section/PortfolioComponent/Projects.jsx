import '../Styles/Projects.css';
import projects from '../Data/Projects';
import ProjectCard from '../PortfolioComponent/ProjectCard';
import project from '../../assets/project.jpg'

const images = {
  "project" : project
};

function Projects() {
  // Replace image strings with actual imports
  const projectData = projects.map(project => ({
    ...project,
      image: images[project.image] || project.image
  }));

  return (
    <section className="projects-section">
      <div className="projects-header">
        <h2>My Portfolio</h2>
        <p>Some of the projects I've worked on</p>
      </div>
      <div className="projects-grid">
        {projectData.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            category={project.category}
            image={project.image}
          />
        ))}
      </div>
      <div className="projects-footer">
        <a href="/projects" className="projects-btn">Explore Other Projects →</a>
      </div>
    </section>
  );
}

export default Projects;
