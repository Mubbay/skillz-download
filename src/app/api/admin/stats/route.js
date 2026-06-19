import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [totalPosts, publishedPosts, draftPosts, totalCategories, recentPosts, seoAvg] = await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { status: 'published' } }),
      prisma.post.count({ where: { status: 'draft' } }),
      prisma.category.count(),
      prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          categories: { include: { category: true } },
        },
      }),
      prisma.post.aggregate({
        _avg: {
          seoScore: true,
        },
      }),
    ]);

    const averageSeoScore = Math.round(seoAvg._avg.seoScore || 0);

    return NextResponse.json({
      totalPosts,
      publishedPosts,
      draftPosts,
      totalCategories,
      recentPosts,
      averageSeoScore,
    });
  } catch (error) {
    console.error('Stats fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch CMS stats' }, { status: 500 });
  }
}
