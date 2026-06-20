import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: 'robotsTxtContent' }
  });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skillzdownload.name.ng';
  
  const defaultRobots = `User-agent: *
Allow: /
Disallow: /admin/
Sitemap: ${baseUrl}/sitemap.xml`;

  const content = setting?.value || defaultRobots;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
