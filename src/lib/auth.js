import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'skillzdownload-fallback-secret-key'
);

export async function verifyAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('skillz_session')?.value;
  if (!token) return null;
  
  try {
    const verified = await jwtVerify(token, SECRET_KEY);
    return verified.payload;
  } catch {
    return null;
  }
}

export const getSession = verifyAuth;

export async function setSessionCookie(payload) {
  const { SignJWT } = await import('jose');
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET_KEY);

  const cookieStore = await cookies();
  cookieStore.set('skillz_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('skillz_session');
}
