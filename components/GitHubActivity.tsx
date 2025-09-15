const GitHubActivity = () => {

  const chartUrl = "https://ghchart.rshah.org/namb0304?theme=onedark";

  const statsUrl = "https://github-readme-stats.vercel.app/api?username=namb0304&show_icons=true&theme=onedark&rank_icon=github";



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