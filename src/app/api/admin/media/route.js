import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// GET /api/admin/media - List all uploaded media files
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const mediaItems = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ mediaItems });
  } catch (error) {
    console.error('List media error:', error);
    return NextResponse.json({ error: 'Failed to list media items' }, { status: 500 });
  }
}

// POST /api/admin/media - Upload a new media file
export async function POST(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const alt = formData.get('alt') || '';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure uploads folder exists in public directory
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    // Generate unique filename
    const sanitizedFilename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = join(uploadDir, sanitizedFilename);

    // Save binary data to storage
    await writeFile(filePath, buffer);

    const url = `/uploads/${sanitizedFilename}`;

    // Log to Prisma DB
    const media = await prisma.media.create({
      data: {
        filename: file.name,
        url,
        mimetype: file.type,
        size: file.size,
        alt: alt || '',
      },
    });

    return NextResponse.json({ media }, { status: 201 });
  } catch (error) {
    console.error('Media upload error:', error);
    return NextResponse.json({ error: 'Failed to upload media file' }, { status: 500 });
  }
}
