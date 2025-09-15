import { siteConfig } from '@/config';

// TypeScriptのために、各スキルの型をより明確に定義します
type Skill = {
  name: string;
  icon: React.ElementType;
  frameworks?: string[]; // 'frameworks' はあってもなくても良い(オプショナル)プロパティ
};

const categoryDisplayNames = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database / BaaS',
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
        <p className="text-center text-gray-400 mb-12">私が今まで触れてきた技術スタックです</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {Object.entries(skills).map(([categoryKey, skillList]) => (
          <div key={categoryKey} className="bg-gray-800/50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-center mb-6 border-b-2 border-cyan-500 pb-2">
              {categoryDisplayNames[categoryKey as keyof typeof categoryDisplayNames]}
            </h3>
            <div className="space-y-4">
              {/* ↓↓↓ ここの(skill)に型注釈を追加しました ↓↓↓ */}
              {(skillList as Skill[]).map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl text-cyan-400"><skill.icon /></span>
                    <span className="font-semibold text-white">{skill.name}</span>
                  </div>
                  
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