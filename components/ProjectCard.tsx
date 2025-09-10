import Image from 'next/image';
import { FaGithub, FaLink } from 'react-icons/fa';

// Propsの型を定義
type Project = {
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  url?: string;
  github?: string;
};

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-300">
      <div className="relative h-48">
        <Image src={project.image} alt={project.title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="bg-gray-700 text-cyan-400 text-xs font-semibold px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-end space-x-4">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <FaGithub size={24} />
            </a>
          )}
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <FaLink size={24} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;