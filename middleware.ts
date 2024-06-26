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

  if (pathname === '/redirect') {
    const sessionQuery = searchParams.get('session');

    if (sessionQuery) {
      responseCookies.set({
        name: 'session',
        value: sessionQuery,
        maxAge: 30 * 60 * 1000, // 30 minutes
      });
    }

    return response;
  }

  let user: User | undefined;

  if (session) {
    try {
      const headers = new Headers();

      headers.append('authorization', `Bearer ${encodeURIComponent(session.value)}`);
      headers.append('baseurl', `${apiUrl}`);
      headers.append('x-forwarded-for', xff);

      const response = await fetch(`${apiUrl}/me`, {
        method: 'GET',
        headers,
        credentials: 'include',
      });

      const responseData = await response.json();

      if (responseData.statusCode !== 401) {
        user = responseData;
        responseCookies.set('email', responseData.email);
      } else {
        requestCookies.getAll().map((cookie) => {
          if (cookie.name !== 'email') {
            responseCookies.delete(cookie.name);
          }
        });
      }
    } catch (_) {}
  }

  const isAuth = user !== undefined;

  if (isAuth && !user?.isVerified && pathname !== '/email-verification') {
    const redirectUrl = new URL('/email-verification', url);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuth && user?.isVerified && pathname === '/email-verification') {
    const redirectUrl = new URL('/', url);
    return NextResponse.redirect(redirectUrl);
  }

  if (!isAuth && pathname === '/email-verification') {
    const redirectUrl = new URL('/login', url);
    return NextResponse.redirect(redirectUrl);
  }

  if (
    isAuth &&
    (pathname === '/login' ||
      pathname === '/password/forgot' ||
      pathname === '/password/reset')
  ) {
    const redirectUrl = new URL(`/redirect?to=${next}`, url);
    return NextResponse.redirect(redirectUrl);
  }

  if (
    !isAuth &&
    pathname !== '/login' &&
    pathname !== '/password/forgot' &&
    pathname !== '/password/reset'
  ) {
    const redirectUrl = new URL(
      pathname !== '/' ? `/login?next=${pathname}` : '/login',
      url,
    );
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: '/((?!api|_next/static|favicon.ico).*)',
};
