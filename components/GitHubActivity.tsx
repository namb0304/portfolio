import Image from 'next/image';

const GitHubActivity = () => {
  // ここに、ステップ1で作成したあなたのグラフURLを貼り付けます
  const chartUrl = "https://ghchart.rshah.org/namb0304";
  const statsUrl = "https://github-readme-stats.vercel.app/api?username=namb0304&show_icons=true&theme=onedark&rank_icon=github";

  return (
    <section id="activity" className="container mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-bold text-center mb-12">GitHub Activity</h2>
      <div className="flex flex-col items-center gap-8">
        {/* GitHub Chart API を使った活動グラフ */}
        <img 
          src={chartUrl} 
          alt="GitHub Contributions Chart" 
          className="w-full max-w-3xl"
        />
        {/* GitHub Readme Stats を使った詳細ステータス */}
        <img 
          src={statsUrl} 
          alt="GitHub Stats" 
          className="w-full max-w-md"
        />
      </div>
    </section>
  );
};

export default GitHubActivity;