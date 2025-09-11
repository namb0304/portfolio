import ProfileHeader from '@/components/ProfileHeader';
import Skills from '@/components/Skills';
import GitHubActivity from '@/components/GitHubActivity';
import ProjectsCarousel from '@/components/ProjectsCarousel';
import Timeline from '@/components/Timeline';
import { siteConfig } from '@/config';

export default function Home() {
  const projects = siteConfig.projects;

  return (
    <div>
      {/* 1. プロフィール: あなたが何者か */}
      <ProfileHeader />

      {/* 2. スキル: 何ができるのか */}
      <Skills />

      {/* 4. プロジェクト: 具体的な成果物 */}
      <ProjectsCarousel />
      
      
      {/* 5. タイムライン: これまでの歩み */}
      <Timeline />
      <GitHubActivity />
      
      {/* 6. コンタクト: 連絡先 */}
      <section id="contact" className="container mx-auto p-4 md:p-8 text-center">
         <h2 className="text-3xl font-bold text-center mb-12">Contact</h2>
         <p>ご連絡は下記メールアドレスまでお願いします。</p>
         <a href={`mailto:${siteConfig.author.email}`} className="text-cyan-400 hover:underline mt-4 inline-block">{siteConfig.author.email}</a>
      </section>
    </div>
  );
}