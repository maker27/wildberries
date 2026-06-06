import { type NextRequest, NextResponse } from 'next/server';

import { AUTH_COOKIE_NAME } from '@/shared/config/auth';
import { withBasePath } from '@/shared/config/basePath';

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

  const authUrl = new URL(withBasePath('/auth'), request.url);
  authUrl.searchParams.set('returnTo', pathname);

  return NextResponse.redirect(authUrl);
}

export const config = {
  matcher: ['/checkout/:path*', '/checkout'],
};
