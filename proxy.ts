import { NextRequest, NextResponse } from 'next/server';

export function proxy(req: NextRequest) {
  const session = req.cookies.get('__session')?.value;
  const isLoginPage = req.nextUrl.pathname === '/admin/login';

  if (!session && !isLoginPage) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }
  if (session && isLoginPage) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
