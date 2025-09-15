import Image from 'next/image';
import { FaGithub, FaLink } from 'react-icons/fa';
import { siteConfig } from '@/config';

type Project = typeof siteConfig.projects[0];
type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  // カード全体のリンク先を決定（デモURL > GitHub URL > リンクなし）
  const primaryUrl = project.url !== 'なし' ? project.url : project.github !== 'なし' ? project.github : undefined;

  return (
    // 1. カード全体を「relative」にして、重ね合わせの基準点にします
    <div className="relative block group h-full bg-gray-800 rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-cyan-500/50">
      
      {/* 2. カード全体を覆う「透明なリンク」を一番下に配置します */}
      {primaryUrl && (
        <a href={primaryUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-0">
          <span className="sr-only">View Project</span>
        </a>
      )}

      {/* 3. 表示されるコンテンツは、透明なリンクの上に重ねます */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="relative h-48">
          <Image src={project.image} alt={project.title} fill className="object-cover rounded-t-lg" />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-gray-400 text-sm mb-4 flex-grow">{project.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="bg-gray-700 text-cyan-400 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
              ))}
            </div>
            
            {/* 4. アイコンのリンクは、さらに上に重ねます */}
            <div className="flex items-center space-x-4">
              {project.github !== "なし" && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="relative z-20 text-gray-400 hover:text-white" title="GitHubリポジトリ">
                  <FaGithub size={20} />
                </a>
              )}
              {project.url !== "なし" ? (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="relative z-20 text-gray-400 hover:text-white" title="デモサイト">
                  <FaLink size={20} />
                </a>
              ) : (
                <span className="text-xs italic text-gray-500">
                  デプロイ準備中...
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;