import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl;
  const pathname = url.pathname;
  const searchParams = new URLSearchParams(url.searchParams);

  return response;
}

export const config = {
  matcher: '/((?!api|_next/static|favicon.ico).*)',
};
