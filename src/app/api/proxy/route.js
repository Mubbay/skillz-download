import { NextResponse } from 'next/server';

export const runtime = 'edge';
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const videoUrl = searchParams.get('url');
  const title = searchParams.get('title') || 'download';
  const ext = searchParams.get('ext') || 'mp4';

  const headersB64 = searchParams.get('h');
  const cookiesB64 = searchParams.get('c');

  const origUrl = searchParams.get('orig');
  const formatId = searchParams.get('fid');

  if (!videoUrl) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  try {
    const fetchHeaders = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': '*/*',
      'Connection': 'keep-alive'
    };

    if (headersB64) {
      try {
        const decodedHeaders = JSON.parse(Buffer.from(headersB64, 'base64').toString('utf-8'));
        // Merge headers, taking care not to overwrite User-Agent if empty, but we prefer yt-dlp's headers
        for (const [k, v] of Object.entries(decodedHeaders)) {
          fetchHeaders[k] = v;
        }
      } catch (e) {
        console.warn('Failed to parse proxy headers');
      }
    }

    if (cookiesB64) {
      try {
        const decodedCookies = Buffer.from(cookiesB64, 'base64').toString('utf-8');
        if (decodedCookies) {
          fetchHeaders['Cookie'] = decodedCookies;
        }
      } catch (e) {
        console.warn('Failed to parse proxy cookies');
      }
    }

    const response = await fetch(videoUrl, {
      headers: fetchHeaders
    });

    if (!response.ok) {
      console.error('Fetch failed! Status:', response.status, response.statusText);
      // Fallback to redirecting the user directly to the video URL.
      return NextResponse.redirect(videoUrl);
    }

    const safeHeaders = new Headers();
    const contentType = response.headers.get('content-type');
    if (contentType) safeHeaders.set('Content-Type', contentType);
    else safeHeaders.set('Content-Type', 'application/octet-stream');
    
    const contentLength = response.headers.get('content-length');
    if (contentLength) safeHeaders.set('Content-Length', contentLength);
    
    const acceptRanges = response.headers.get('accept-ranges');
    if (acceptRanges) safeHeaders.set('Accept-Ranges', acceptRanges);

    // Force download by setting Content-Disposition
    // Remove characters that might cause header parsing issues
    const safeTitle = title.replace(/[^a-zA-Z0-9-_\s]/g, '').trim().replace(/\s+/g, '_') || 'Video';
    safeHeaders.set('Content-Disposition', `attachment; filename="SkillzDownload_${safeTitle}.${ext}"`);
    safeHeaders.set('Access-Control-Allow-Origin', '*');

    return new NextResponse(response.body, {
      status: 200,
      headers: safeHeaders
    });
  } catch (error) {
    console.error('Proxy error:', error);
    // Fallback to redirecting directly to the video if proxying completely fails
    return NextResponse.redirect(videoUrl);
  }
}
