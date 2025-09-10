// "use client" と useState の import は不要になったので削除

import ProfileHeader from '@/components/ProfileHeader';
import ProjectCard from '@/components/ProjectCard';
import { siteConfig } from '@/config';

export default function Home() {
  // useStateとfilteredProjectsのロジックは不要になったので削除
  const projects = siteConfig.projects;

  return (
    <div>
      <ProfileHeader />

      {/* プロジェクト一覧にidを追加 */}
      <section id="projects" className="container mx-auto p-4 md:p-8">
        <h2 className="text-3xl font-bold text-center mb-12">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </section>
      
      {/* お問い合わせセクションの例 */}
      <section id="contact" className="container mx-auto p-4 md:p-8 text-center">
         <h2 className="text-3xl font-bold text-center mb-12">Contact</h2>
         <p>ご連絡は下記メールアドレスまでお願いします。</p>
         <a href={`mailto:${siteConfig.author.email}`} className="text-cyan-400 hover:underline mt-4 inline-block">{siteConfig.author.email}</a>
      </section>
    </div>
  );
}