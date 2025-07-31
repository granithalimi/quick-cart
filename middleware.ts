import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_ROUTES = [
  /^\/products\/[^\/]+$/,
  /^\/search(?:\/.*)?$/,
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route matches any public route
  const isPublic = PUBLIC_ROUTES.some((pattern) => pattern.test(pathname));

  if (isPublic) {
    return NextResponse.next(); // allow access without auth
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
