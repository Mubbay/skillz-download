import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

export async function GET() {
  const session = await verifyAuth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const siteStat = await prisma.siteStat.findUnique({ where: { id: 'global' } });
    const globalViews = siteStat?.totalViews || 0;

    const toolStats = await prisma.toolStat.findMany({
      orderBy: { usageCount: 'desc' }
    });

    const recentHistory = await prisma.toolHistory.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50
    });

    const popularPosts = await prisma.post.findMany({
      where: { status: 'published', views: { gt: 0 } },
      orderBy: { views: 'desc' },
      take: 10,
      select: { id: true, title: true, slug: true, views: true }
    });

    return NextResponse.json({
      globalViews,
      toolStats,
      recentHistory,
      popularPosts
    });
  } catch (error) {
    console.error('Analytics API Error:', error);
    return NextResponse.json({ error: 'Failed to load analytics' }, { status: 500 });
  }
}
