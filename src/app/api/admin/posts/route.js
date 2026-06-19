import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { calculateSeoScore } from '@/lib/seo-scorer';
import slugify from 'slugify';

// GET /api/admin/posts - List all posts
export async function GET(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const status = searchParams.get('status') || undefined;
  const search = searchParams.get('search') || undefined;

  const where = {};
  if (status) where.status = status;
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { content: { contains: search } },
    ];
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      include: {
        author: { select: { name: true, email: true } },
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.post.count({ where }),
  ]);

  return NextResponse.json({
    posts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

// POST /api/admin/posts - Create a new post
export async function POST(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      title,
      content,
      excerpt,
      featuredImage,
      status,
      seoTitle,
      seoDescription,
      focusKeyword,
      categoryIds,
      tagIds,
    } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Generate slug
    let slug = slugify(title, { lower: true, strict: true });
    // Check for duplicate slugs
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    // Calculate SEO score
    const seoResult = calculateSeoScore({
      title,
      slug,
      content,
      seoTitle,
      seoDescription,
      focusKeyword,
    });

    // Calculate reading time
    const wordCount = content.trim().split(/\s+/).filter(w => w.length > 0).length;
    const readingTime = Math.ceil(wordCount / 200);

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || '',
        featuredImage: featuredImage || '',
        status: status || 'draft',
        seoTitle: seoTitle || '',
        seoDescription: seoDescription || '',
        focusKeyword: focusKeyword || '',
        seoScore: seoResult.score,
        readingTime,
        authorId: session.userId,
        categories: categoryIds?.length
          ? { create: categoryIds.map(id => ({ categoryId: id })) }
          : undefined,
        tags: tagIds?.length
          ? { create: tagIds.map(id => ({ tagId: id })) }
          : undefined,
      },
      include: {
        author: { select: { name: true, email: true } },
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
      },
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
