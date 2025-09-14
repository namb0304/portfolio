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

  // カードの見た目部分
  const cardContent = (
    <div className="block bg-gray-800 rounded-lg overflow-hidden shadow-lg h-full flex flex-col transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-cyan-500/50">
      <div className="relative h-48">
        <Image src={project.image} alt={project.title} fill className="object-cover" />
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
          {/* ↓↓↓ アイコン部分の<a>タグを、クリックイベントを止めるdivに変更 ↓↓↓ */}
          <div className="flex items-center space-x-4 text-gray-400">
            {project.github !== "なし" && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="hover:text-white">
                <FaGithub size={20} />
              </a>
            )}
            {project.url !== "なし" ? (
              <a href={project.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="hover:text-white">
                <FaLink size={20} />
              </a>
            ) : (
              <span className="text-xs italic text-gray-500" title="現在デプロイされていません">
                デプロイ準備中...
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // カード全体をクリック可能にするためのラッパー
  return (
    primaryUrl ? (
      <a href={primaryUrl} target="_blank" rel="noopener noreferrer" className="block group h-full">
        {cardContent}
      </a>
    ) : (
      <div className="block group h-full">
        {cardContent}
      </div>
    )
  );
};

export default ProjectCard;