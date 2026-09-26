import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ghchart.rshah.org',
      },
      {
        protocol: 'https',
        hostname: 'github-readme-stats.vercel.app',
      },
    ],
  },
  /*
    /design-lab は検証用URLだった。Home v3 を / へ昇格したので、
    開かれても完成版の Home へ着地させる。
    恒久リダイレクト(308)はブラウザにキャッシュされて後から戻せないため、
    まずは一時リダイレクト(307)にしておく。
  */
  async redirects() {
    return [
      { source: "/design-lab", destination: "/", permanent: false },
      { source: "/design-lab/:path*", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
