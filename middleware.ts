import { type NextRequest, NextResponse } from 'next/server';

const AUTH_COOKIE_NAME = 'wb-auth';
const PROTECTED_PATHS = ['/checkout'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));

  if (!isProtected) {
    return NextResponse.next();
  }

  const isAuthenticated = request.cookies.get(AUTH_COOKIE_NAME)?.value === '1';

  if (isAuthenticated) {
    return NextResponse.next();
  }

  const authUrl = new URL('/auth', request.url);
  authUrl.searchParams.set('returnTo', pathname);

  return NextResponse.redirect(authUrl);
}

export const config = {
  matcher: ['/checkout/:path*', '/checkout'],
};
