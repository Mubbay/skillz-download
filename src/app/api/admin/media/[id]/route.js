import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { unlink } from 'fs/promises';
import { join } from 'path';

export async function DELETE(request, { params }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;

    const media = await prisma.media.findUnique({ where: { id } });
    if (!media) {
      return NextResponse.json({ error: 'Media file not found' }, { status: 404 });
    }

    // Try deleting from disk
    try {
      const filename = media.url.replace('/uploads/', '');
      const filePath = join(process.cwd(), 'public', 'uploads', filename);
      await unlink(filePath);
    } catch (diskErr) {
      console.warn(`Could not delete file from disk: ${media.url}. It might have been deleted already.`, diskErr.message);
    }

    // Delete record from DB
    await prisma.media.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete media error:', error);
    return NextResponse.json({ error: 'Failed to delete media item' }, { status: 500 });
  }
}
