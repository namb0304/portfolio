import ProfileHeader from '@/components/ProfileHeader';
import Skills from '@/components/Skills';
import GitHubActivity from '@/components/GitHubActivity';
import ProjectsCarousel from '@/components/ProjectsCarousel';
import ProjectsSection from '@/components/ProjectsSection'; 
import Timeline from '@/components/Timeline';
import { siteConfig } from '@/config';
import MotionWrap from '@/components/MotionWrap';

export default function Home() {
  return (
    <div>
      {/* 1. プロフィール */}
      <MotionWrap>
        <ProfileHeader />
      </MotionWrap>

      {/* 2. スキル */}
      <MotionWrap>
        <Skills />
      </MotionWrap>

      {/* 4. プロジェクト */}
      <MotionWrap>
        <ProjectsSection />
      </MotionWrap>
      
      {/* 5. タイムライン */}
      <MotionWrap>
        <Timeline />
        <GitHubActivity />
      </MotionWrap>
      
      {/* 6. コンタクト */}
      <MotionWrap>
        <section id="contact" className="container mx-auto p-4 md:p-8 text-center scroll-mt-16">
          <h2 className="text-3xl font-bold text-center mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            Contact
            </span>
          </h2>
           <p>ご連絡は下記メールアドレスまでお願いします。</p>
           <a href={`mailto:${siteConfig.author.email}`} className="text-cyan-400 hover:underline mt-4 inline-block">{siteConfig.author.email}</a>
        </section>
      </MotionWrap>
    </div>
  );
}