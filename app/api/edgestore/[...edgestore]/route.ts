import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
import { NextRequest, NextResponse } from "next/server";
const es = initEdgeStore.create();
const edgeStoreRouter = es.router({ myPublicImages: es.imageBucket() });
let configuredHandler:
  | ReturnType<typeof createEdgeStoreNextHandler>
  | undefined;
async function handler(req: NextRequest) {
  if (
    !process.env.EDGE_STORE_ACCESS_KEY ||
    !process.env.EDGE_STORE_SECRET_KEY ||
    process.env.EDGE_STORE_ACCESS_KEY.includes("your_")
  ) {
    return NextResponse.json(
      { error: "Image uploads are not configured." },
      { status: 503 },
    );
  }
  configuredHandler ??= createEdgeStoreNextHandler({ router: edgeStoreRouter });
  return configuredHandler(req);
}
export { handler as GET, handler as POST };
export type EdgeStoreRouter = typeof edgeStoreRouter;
