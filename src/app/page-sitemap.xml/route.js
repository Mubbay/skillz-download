import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skillzdownload.name.ng';
  const now = new Date().toISOString();

  const staticPages = [
    { url: baseUrl, freq: 'daily', priority: 1.0 },
    { url: `${baseUrl}/blog`, freq: 'daily', priority: 0.9 },
    { url: `${baseUrl}/youtube-downloader`, freq: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/tiktok-downloader`, freq: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/facebook-downloader`, freq: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/vimeo-downloader`, freq: 'weekly', priority: 0.9 }
  ];

  const urls = staticPages.map(page => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.freq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
    },
  });
}
