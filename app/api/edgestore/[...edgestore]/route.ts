import {initEdgeStore} from '@edgestore/server'
import {createEdgeStoreNextHandler} from '@edgestore/server/adapters/next/app'
const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
    myPublicImages: es.imageBucket()
})

const handler = createEdgeStoreNextHandler({
    router: edgeStoreRouter
})
const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'https://travel-agency-mauve-zeta.vercel.app');
    headers.append('Content-Type', 'application/json');
export {handler as GET, handler as POST};

export type EdgeStoreRouter = typeof edgeStoreRouter