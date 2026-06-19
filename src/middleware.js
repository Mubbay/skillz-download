import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'skillzdownload-fallback-secret-key'
);

const COOKIE_NAME = 'skillz_session';

// Routes that require authentication
const protectedRoutes = ['/admin'];
// Routes that should redirect to dashboard if already logged in
const authRoutes = ['/admin/login'];

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;

  // Check if user is authenticated
  let isAuthenticated = false;
  if (token) {
    try {
      await jwtVerify(token, SECRET_KEY);
      isAuthenticated = true;
    } catch {
      isAuthenticated = false;
    }
  }

  // If trying to access auth routes while logged in, redirect to admin
  if (authRoutes.some(route => pathname === route) && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // If trying to access protected routes without auth, redirect to login
  const isProtected = protectedRoutes.some(
    route => pathname === route || (pathname.startsWith(route + '/') && !authRoutes.includes(pathname))
  );

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
