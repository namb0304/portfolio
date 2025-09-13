import { siteConfig } from '@/config';
import ProjectCard from './ProjectCard';

const ProjectsGrid = () => {
  const { projects } = siteConfig;
  return (
    // ↓↓↓ このコンテナを追加しました ↓↓↓
    <div className="h-[80vh] overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsGrid;