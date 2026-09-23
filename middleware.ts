import { authMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextFetchEvent, NextResponse } from "next/server";
import { authConfigured } from "./app/lib/config";
const clerkMiddleware = authConfigured
  ? authMiddleware({
      publicRoutes: [
        "/",
        "/offers(.*)",
        "/saved",
        "/contact",
        "/terms",
        "/privacy",
        "/trips",
        "/user(.*)",
        "/vacation(.*)",
        "/hotel(.*)",
        "/offer(.*)",
        "/ai",
        "/booking(.*)",
        "/cancelled",
        "/about",
        "/blogs(.*)",
        "/api(.*)",
      ],
    })
  : null;
export default function middleware(
  request: NextRequest,
  event: NextFetchEvent,
) {
  return clerkMiddleware
    ? clerkMiddleware(request, event)
    : NextResponse.next();
}
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
