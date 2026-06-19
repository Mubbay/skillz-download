import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

export async function GET(request) {
  const session = await verifyAuth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') || undefined;

  try {
    const topics = await prisma.autoBlogTopic.findMany({
      where: status ? { status } : undefined,
      include: { category: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(topics);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch topics' }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await verifyAuth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { action, id, title, categoryId, status } = data;

    if (action === 'create') {
      const newTopic = await prisma.autoBlogTopic.create({
        data: { title, categoryId, status: status || 'pending' },
        include: { category: true }
      });
      return NextResponse.json(newTopic);
    }

    if (action === 'update') {
      const updated = await prisma.autoBlogTopic.update({
        where: { id },
        data: { title, categoryId, status },
        include: { category: true }
      });
      return NextResponse.json(updated);
    }

    if (action === 'delete') {
      await prisma.autoBlogTopic.delete({ where: { id } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('AutoBlog API Error:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
