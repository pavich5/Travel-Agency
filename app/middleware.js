import { NextResponse } from "next/server";

export function middleware() {
    // Create a new response object
    const res = new NextResponse();

    // Add the CORS headers to the response
    res.headers.append('Access-Control-Allow-Credentials', "true");
    res.headers.append('Access-Control-Allow-Origin', 'https://travel-agency-plum.vercel.app');
    res.headers.append('Access-Control-Allow-Methods', 'GET, DELETE, PATCH, POST, PUT');
    res.headers.append(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    return res;
}

export const config = {
    matcher: '/api/:path*',
};
