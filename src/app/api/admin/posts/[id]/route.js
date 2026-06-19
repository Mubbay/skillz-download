import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { calculateSeoScore } from '@/lib/seo-scorer';
import slugify from 'slugify';

// GET /api/admin/posts/[id] - Get single post
export async function GET(request, { params }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: { select: { name: true, email: true } },
      categories: { include: { category: true } },
      tags: { include: { tag: true } },
    },
  });

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json({ post });
}

// PUT /api/admin/posts/[id] - Update a post
export async function PUT(request, { params }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const {
      title,
      slug: newSlug,
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

    // Calculate slug
    let slug = newSlug || slugify(title, { lower: true, strict: true });
    const existing = await prisma.post.findFirst({
      where: { slug, NOT: { id } },
    });
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

    // Delete existing relations
    await prisma.postCategory.deleteMany({ where: { postId: id } });
    await prisma.postTag.deleteMany({ where: { postId: id } });

    const post = await prisma.post.update({
      where: { id },
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
        categories: categoryIds?.length
          ? { create: categoryIds.map(cid => ({ categoryId: cid })) }
          : undefined,
        tags: tagIds?.length
          ? { create: tagIds.map(tid => ({ tagId: tid })) }
          : undefined,
      },
      include: {
        author: { select: { name: true, email: true } },
        categories: { include: { category: true } },
        tags: { include: { tag: true } },
      },
    });

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Update post error:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/posts/[id] - Delete a post
export async function DELETE(request, { params }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete post error:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
