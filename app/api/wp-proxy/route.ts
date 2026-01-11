import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get('path');

  if (!path) {
    return NextResponse.json({ error: 'Missing path parameter' }, { status: 400 });
  }

  try {
    const wpUrl = `https://dir.lascrucesdirectory.com${path}`;

    const response = await fetch(wpUrl, {
      next: { revalidate: 3600 },
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`WordPress API returned ${response.status}`);
    }

    const data = await response.json();
    const headers = new Headers();

    // Copy relevant headers
    if (response.headers.get('X-WP-Total')) {
      headers.set('X-WP-Total', response.headers.get('X-WP-Total') || '0');
    }
    if (response.headers.get('X-WP-TotalPages')) {
      headers.set('X-WP-TotalPages', response.headers.get('X-WP-TotalPages') || '0');
    }

    headers.set('Content-Type', 'application/json');
    headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('WordPress API proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from WordPress API' },
      { status: 500 }
    );
  }
}
