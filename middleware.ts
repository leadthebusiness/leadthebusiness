import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if the request is for the studio route
  if (request.nextUrl.pathname.startsWith("/studio")) {
    // Check if the user has the authentication cookie
    const authCookie = request.cookies.get("studio-auth")

    if (!authCookie) {
      // Redirect to studio login if no auth cookie
      return NextResponse.redirect(new URL("/studio-login", request.url))
    }

    // If cookie exists, allow access to studio
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/studio/:path*",
}
