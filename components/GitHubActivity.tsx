import Image from 'next/image';

const GitHubActivity = () => {
  const username = "namb0304";

  // GitHub貢献度カレンダー
  const chartUrl = `https://ghchart.rshah.org/${username}?theme=onedark`;

  // GitHub Readme Stats 公式API
  const statsBaseUrl = "https://github-readme-stats.vercel.app";

  // GitHub Stats Card（プライベートリポジトリ含む、アイコン表示）
  const statsUrl = `${statsBaseUrl}/api?username=${username}&show_icons=true&count_private=true&theme=onedark&rank_icon=github`;

  // Top Languages Card（コンパクトレイアウト）
  const topLangsUrl = `${statsBaseUrl}/api/top-langs/?username=${username}&layout=compact&theme=onedark&langs_count=8`;

  return (
    <section id="activity" className="container mx-auto p-4 md:p-8 scroll-mt-16">
      {/* === 見出しと線 === */}
      <div className="flex items-center justify-center gap-4 md:gap-8 mt-12 mb-4">
        <div className="w-full sm:w-1/4 h-px bg-gray-700"></div>
        <h2 className="text-base sm:text-lg font-mono uppercase tracking-widest text-gray-400 whitespace-nowrap">
          GitHub Activity
        </h2>
        <div className="w-full sm:w-1/4 h-px bg-gray-700"></div>
      </div>

      {/* === 説明文 === */}
      <p className="text-center text-gray-400 mb-12">
        私のGitHubでの活動状況を示しています<br />緑の濃さは貢献度を表し、より多くのコミットやプルリクエストを行うほど濃くなります
      </p>

      <div className="flex flex-col items-center gap-8">
        {/* GitHub貢献度カレンダー */}
        <div className="w-full max-w-3xl relative">
          <Image
            src={chartUrl}
            alt="GitHub Contributions Chart"
            width={896}
            height={112}
            className="w-full h-auto"
            unoptimized
          />
        </div>

        {/* Stats Card と Top Languages を横並び（PC）／縦並び（モバイル） */}
        <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-6">
          {/* GitHub Stats Card */}
          <div className="w-full md:w-1/2 relative flex justify-center">
            <Image
              src={statsUrl}
              alt="GitHub Stats"
              width={495}
              height={195}
              className="w-full h-auto max-w-md"
              unoptimized
            />
          </div>

          {/* Top Languages Card */}
          <div className="w-full md:w-1/2 relative flex justify-center">
            <Image
              src={topLangsUrl}
              alt="Top Languages"
              width={350}
              height={195}
              className="w-full h-auto max-w-md"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;
