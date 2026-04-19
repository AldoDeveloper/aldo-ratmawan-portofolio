import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const url = req.nextUrl.pathname;

    if(url.startsWith('/dashboard')){
        return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
}