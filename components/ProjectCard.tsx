import Image from 'next/image';
import { FaGithub, FaLink } from 'react-icons/fa';
import { siteConfig } from '@/config';

type Project = typeof siteConfig.projects[0];
type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <a href={project.url || project.github} target="_blank" rel="noopener noreferrer" className="block bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:-translate-y-2">
      <div className="relative h-48">
        <Image src={project.image} alt={project.title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4 h-20 overflow-hidden">{project.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="bg-gray-700 text-cyan-400 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            {project.github && <FaGithub size={20} />}
            {project.url && <FaLink size={20} />}
          </div>
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;