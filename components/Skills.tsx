import { siteConfig } from '@/config'; // 設定ファイルをインポート
// このファイルにあったskills配列は削除！

const Skills = () => {
  const skills = siteConfig.skills; // 設定ファイルからスキルリストを取得

  return (
    <section className="bg-gray-900 py-20">
      {/* ... */}
      <div className="flex flex-wrap justify-center gap-4">
        {skills.map((skill) => (
          <div key={skill.name} className="...">
            <span className="text-xl"><skill.icon /></span> {/* iconがコンポーネントなのでこのように呼び出す */}
            <span className="font-semibold">{skill.name}</span>
          </div>
        ))}
      </div>
      {/* ... */}
    </section>
  );
};

export default Skills;