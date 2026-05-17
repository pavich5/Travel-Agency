export async function GET() {
    const STRIPE_ACCESS_KEY = process.env.STRIPE_ACCESS_KEY;
  
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000');
    headers.append('Content-Type', 'application/json');
  
    return new Response(JSON.stringify(STRIPE_ACCESS_KEY), {
      headers,
    });
  }
  
