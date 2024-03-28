import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const pathname = url.pathname;
  const responseCookies = response.cookies;
  const requestCookies = request.cookies;
  const xff = `${request.headers.get('x-forwarded-for')?.split(',')[0]}`;
  const session = requestCookies.get('session');
  const searchParams = new URLSearchParams(url.searchParams);
  const next = decodeURIComponent(searchParams.get('next') ?? '/');

  responseCookies.set('page', pathname);

  return response;
}

export const config = {
  matcher: '/((?!api|_next/static|favicon.ico).*)',
};
