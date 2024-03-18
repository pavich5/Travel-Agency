// Remove import statement for authMiddleware

// Export an empty middleware function
export default function(req: any, res: any, next: () => void) {
  // No authentication logic, just pass control to the next middleware
  next();
}
 
export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
