import { getSettings } from '@/lib/content';

export default function robots() {
  const base = getSettings().siteUrl;
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: '/api/' }],
    sitemap: `${base}/sitemap.xml`,
  };
}
