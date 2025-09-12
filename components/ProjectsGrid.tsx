import { siteConfig } from '@/config';
import ProjectCard from './ProjectCard';

const ProjectsGrid = () => {
  const { projects } = siteConfig;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
};

export default ProjectsGrid;