import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { type, id, name } = body;

    if (type === 'siteView') {
      // Increment global site views
      await prisma.siteStat.upsert({
        where: { id: 'global' },
        update: { totalViews: { increment: 1 } },
        create: { id: 'global', totalViews: 1 }
      });
      return NextResponse.json({ success: true });
    }

    if (type === 'postView' && id) {
      // Increment post views
      await prisma.post.update({
        where: { slug: id },
        data: { views: { increment: 1 } }
      });
      return NextResponse.json({ success: true });
    }

    if (type === 'toolUsage' && id) {
      // Increment tool usage and log history
      await prisma.toolStat.upsert({
        where: { toolId: id },
        update: { usageCount: { increment: 1 } },
        create: { toolId: id, name: name || id, usageCount: 1 }
      });
      
      await prisma.toolHistory.create({
        data: {
          toolId: id,
          action: 'executed',
          metadata: JSON.stringify({ timestamp: Date.now() })
        }
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid tracking payload' }, { status: 400 });
  } catch (error) {
    console.error('Tracking Error:', error);
    return NextResponse.json({ error: 'Failed to track metric' }, { status: 500 });
  }
}
