export async function GET() {
    const STRIPE_ACCESS_KEY = process.env.STRIPE_ACCESS_KEY;
  
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'https://travel-agency-mauve-zeta.vercel.app');
    headers.append('Content-Type', 'application/json');
  
    return new Response(JSON.stringify(STRIPE_ACCESS_KEY), {
      headers,
    });
  }
  