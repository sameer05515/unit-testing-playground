import { NextRequest, NextResponse } from 'next/server';
import { getComicBySlug, getComicFile } from '@/lib/comics';
import * as fs from 'fs';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const comic = getComicBySlug(slug);

    if (!comic) {
      return NextResponse.json(
        { error: 'Comic not found' },
        { status: 404 }
      );
    }

    const filePath = getComicFile(comic.relativePath);

    if (!filePath || !fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Comic file not found' },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(filePath);
    const fileName = encodeURIComponent(comic.name);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${fileName}"`,
        'Content-Length': fileBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Error serving comic:', error);
    return NextResponse.json(
      { error: 'Failed to serve comic' },
      { status: 500 }
    );
  }
}
