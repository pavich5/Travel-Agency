import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextFetchEvent, NextMiddleware } from "next/server";

// Define authentication middleware (if needed)
const auth = authMiddleware({
  publicRoutes: [
    "/",
    "/api",
    "/successfully",
    "/api/createlink",
    "/api/getStripeApi",
    "/cancelled",
    "/vacation/list/:type",
    "/vacation/:name",
    "/hotel/:name",
    "/offer/:id",
    "/ai",
    "/booking/confirmation/:id",
    "/booking/confirmed/:id",
    "/about",
    "/api/checkdb",
    "/blogs",
    "/api/createPost",
    "/api/getAllPosts",
    "/api/getPostById",
    "/api/removePost",
    "/api/likePost",
    "/api/addComment",
    "/api/edgestore/request-upload",
    "/api/webhook"
  ],
});

// Middleware function to apply authentication
const middleware: NextMiddleware = (request: NextRequest, event: NextFetchEvent) =>
  auth(request, event);

export default middleware;
