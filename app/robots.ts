import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";

/** 全ページ公開。検証用だった /design-lab は / へ redirect するので除外しない。 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
