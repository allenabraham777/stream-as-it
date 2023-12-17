import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/stream/*'].map((route) => new RegExp(route, 'g'));
const authRoutes = ['/login', '/signup'].map((route) => new RegExp(route, 'g'));

export function middleware(request: NextRequest) {
    const isProtectedRoute = protectedRoutes.some((route) => route.test(request.nextUrl.pathname));

    const token = request.cookies.get('authToken')?.value;

    if (isProtectedRoute && !token) {
        request.cookies.delete('authToken');
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('authToken');

        return response;
    }

    const isAuthRoute = authRoutes.some((route) => route.test(request.nextUrl.pathname));

    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL('/stream/dashboard', request.url));
    }
}
