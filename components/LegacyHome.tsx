/**
 * Visual Spike 2026-09 以前の TOP の構成をそのまま保持しているコンポーネント。
 * 旧実装を削除せず、いつでも戻せるようにするために残している。
 * 現在はどこからもレンダリングしていない。
 * 戻すときは app/page.tsx で <LegacyHome /> を返すだけでよい。
 */
import ProfileHeader from "@/components/ProfileHeader";
import Skills from "@/components/Skills";
import GitHubActivity from "@/components/GitHubActivity";
import ProjectsSection from "@/components/ProjectsSection";
import Timeline from "@/components/Timeline";
import MotionWrap from "@/components/MotionWrap";
import Contact from "@/components/Contact";

export default function LegacyHome() {
  return (
    <div className="pb-24">
      <MotionWrap>
        <ProfileHeader />
      </MotionWrap>

      <MotionWrap>
        <Skills />
      </MotionWrap>

      <MotionWrap>
        <ProjectsSection />
      </MotionWrap>

      <MotionWrap>
        <Timeline />
        <GitHubActivity />
      </MotionWrap>

      <MotionWrap>
        <Contact />
      </MotionWrap>
    </div>
  );
}
