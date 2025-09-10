import Image from 'next/image';

export default function Home() {
  return (
    // 以前の <main> タグは一度削除し、セクションごとに組み立てます
    <>
      {/* ===== Hero Section ===== */}
      <section className="relative h-screen flex items-center justify-center text-center text-white">
        {/* 背景画像 */}
        <Image
          src="/images/hero-background.jpg"
          alt="Background"
          fill // "layout"の代わりにこれを使う
          quality={80}
          className="-z-10 object-cover" // "objectFit"の代わりにTailwindのクラスを使う
          />
        {/* 背景のオーバーレイ */}
        <div className="absolute inset-0 bg-black/60 -z-10" />

        <div className="z-10 animate-fade-in-up">
          <div className="mb-4">
            <Image
              src="/images/profile-icon.jpg" // プロフィール画像
              alt="南保俊輔"
              width={150}
              height={150}
              className="rounded-full mx-auto border-4 border-white shadow-lg"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Shunsuke Nambo
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            大学2年生 / Web Developer / ハッカソン好き<br />
            新しい技術とアイデアで、世界を少しだけ面白くしたい。
          </p>
        </div>
      </section>

      {/* この下に他のセクションを追加していく */}
    </>
  );
}