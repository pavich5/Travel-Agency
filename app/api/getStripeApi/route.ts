export async function GET() {
    const STRIPE_ACCESS_KEY = process.env.STRIPE_ACCESS_KEY
    return new Response(JSON.stringify(STRIPE_ACCESS_KEY));
} 
