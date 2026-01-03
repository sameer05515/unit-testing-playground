import { NextRequest, NextResponse } from 'next/server';
import { getAllComics } from '@/lib/comics';
import { SortOption } from '@/types/comic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sortBy = (searchParams.get('sortBy') || 'name') as SortOption;

    const comics = getAllComics(sortBy);
    
    return NextResponse.json(comics);
  } catch (error) {
    console.error('Error fetching comics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comics' },
      { status: 500 }
    );
  }
}
