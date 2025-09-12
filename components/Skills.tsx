import { siteConfig } from '@/config';

const categoryDisplayNames = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  tools: 'Tools & Others'
};

const Skills = () => {
  const { skills } = siteConfig;

  return (
    <section id="skills" className="container mx-auto p-4 md:p-8 scroll-mt-16">
        <h2 className="text-3xl font-bold text-center mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            Skills
            </span>
        </h2>
        <p className="text-center text-gray-400 mb-8">私が今まで触れてきた技術スタックです。</p>

      {/* PCでは最大4カラム、画面サイズに応じて自動で調整 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {Object.entries(skills).map(([categoryKey, skillList]) => (
          // === 各カテゴリの列 ===
          <div key={categoryKey} className="bg-gray-800/50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-center mb-6 border-b-2 border-cyan-500 pb-2">
              {categoryDisplayNames[categoryKey as keyof typeof categoryDisplayNames]}
            </h3>
            <div className="space-y-4">
              {skillList.map((skill) => (
                // --- 各スキル項目 ---
                <div key={skill.name}>
                  {/* 親スキル (言語など) */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl text-cyan-400"><skill.icon /></span>
                    <span className="font-semibold text-white">{skill.name}</span>
                  </div>
                  
                  {/* ★★★ 関連フレームワークがあれば、薄い文字で表示 ★★★ */}
                  {skill.frameworks && (
                    <div className="pl-10 pt-1">
                      <p className="text-sm text-gray-400">
                        {skill.frameworks.join(' / ')}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;