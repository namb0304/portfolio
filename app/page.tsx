import ProfileHeader from '@/components/ProfileHeader';
import Skills from '@/components/Skills';
import GitHubActivity from '@/components/GitHubActivity';
import ProjectsSection from '@/components/ProjectsSection';
import Timeline from '@/components/Timeline';
import MotionWrap from '@/components/MotionWrap';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <div className="pb-24">
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
        <Contact />
      </MotionWrap>
    </div>
  );
}